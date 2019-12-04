#include "streaming-worker.h"
#include "CYdLidar.h"
#include "json.hpp"  //https://github.com/nlohmann/json
#include <iostream>
#include <string>
#include <memory>
using namespace std;
using namespace ydlidar;
using json = nlohmann::json;

class LidarSensor : public StreamingWorker {
    public:

    CYdLidar laser;
    bool ready; 

    LidarSensor(Callback *data, Callback *complete, Callback *error_callback, v8::Local<v8::Object> & options) 
          : StreamingWorker(data, complete, error_callback){

            ydlidar::init(argc, argv);
            std::string port;
            // std::string baudrate;
            int baud = 115200;
            printf("__   ______  _     ___ ____    _    ____  \n");
            printf("\\ \\ / /  _ \\| |   |_ _|  _ \\  / \\  |  _ \\ \n");
            printf(" \\ V /| | | | |    | || | | |/ _ \\ | |_) | \n");
            printf("  | | | |_| | |___ | || |_| / ___ \\|  _ <  \n");
            printf("  |_| |____/|_____|___|____/_/   \\_\\_| \\_\\ \n");
            printf(" PWS_CAR LIDAR v1.0");
            printf("\n");
            fflush(stdout);

            std::map<std::string, std::string> lidars = YDlidarDriver::lidarPortList();
            
            // Checking if Lidar is found!
            if (lidars.size() == 1) {
                std::map<string, string>::iterator iter = lidars.begin();
                port = iter->second;
            }

            if (!ydlidar::ok()) {
                return 0;
            }

            laser.setSerialPort(port);
            laser.setSerialBaudrate(baud);
            laser.setFixedResolution(false);
            laser.setReversion(false);
            laser.setAutoReconnect(true);
            laser.setGlassNoise(true);
            laser.setSunNoise(true);
    }
     
    void Execute (const AsyncProgressWorker::ExecutionProgress& progress) {

        ready = laser.initialize();
        while (ready && ydlidar::ok()) {
            bool hardError;
            LaserScan scan;

            if (laser.doProcessSimple(scan, hardError)) {
                // printf ("data_point: %.2f %.2f \n", scan.data[0].range, scan.data[0].angle);
                json lidarData; 
                for (int i = 0; i <= scan.data.size(); i++) {
                    json point;
                    point["angle"] = scan.data[i].angle
                    point["distance"] =  scan.data[i].range
                    lidarData[i] = point;
                }

                Message tosend("lidar_data", lidarData.dump());
                writeToNode(progress, tosend);
            }
        }

        
        laser.turnOff();
        laser.disconnecting();
    }

};

StreamingWorker * create_worker(Callback *data
    , Callback *complete
    , Callback *error_callback, v8::Local<v8::Object> & options) {
 
 return new LidarSensor(data, complete, error_callback, options);
}

NODE_MODULE(lidar_sensor, StreamWorkerWrapper::Init)

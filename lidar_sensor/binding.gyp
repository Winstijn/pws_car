{
  "targets": [
    {
      "target_name": "lidar_sensor",
      "sources": [ "main.cpp" ], 
      "cflags": ["-std=c++11"],
      "cflags!": [ '-fno-exceptions' ],
      "cflags_cc!": [ '-fno-exceptions' ],
      "include_dirs" : ["<!(node -e \"require('nan')\")", "<!(node -e \"require('streaming-worker-sdk')\")"]
    }
  ]
}

things i did to make the containerization work 
- python muselsl - change in record.py - for the file creation 
- default arm -> amd architecture for podman. arm not compatible with liblsl. liblsl does not have any packages for arm architecture - link https://github.com/sccn/liblsl/releases
- conda install not required? - set PATH=PATH:<conda_path>
- install liblsl from conda forge currently
- nodeman is installed on the server side

todo (05/02):
- raw vid required
- readme for the setup, code, and deploy on local 
- diff between demo/index.js and demo/typescript/index.ts
- cleanup code - too many unnecessary comments

Issues with the setup currently:
- switching tab/window/desktop stops recording of the data 
- if there more than one muse headsets around, we do not have an option to choose
- the muse data is not recorded as soon as the button starts countdown
- there is no way to track more than one individual at a time (probably because there is no ML model for it)
- 

Low:
- icon changes
- figure out the number of frames per second
- remove coordinates from the data/downsample teh gesture data acquired in gesture.json
- check how much space each 1 min video takes + muse 

Enhancements:
- containerize the app using podman 



some changes made that needs to be documented:
- python muselsl - changed code in record.py, documented in github
- arm -> amd, for containerization, document the commands
  - <document it here>
- started with ubuntu 22 container instead of python
- if we install conda we need to either deactivate it set the PATH=$PATH:<conda_path> so python is not picked up from conda
- liblsl is picked up from the deb package and not the pip package
- liblsl has some dependencies that need to be installed before
  - <document it here>
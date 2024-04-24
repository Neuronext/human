- hosting (2 hosting face camera + eeg data)
- data export with and without overlaying it (button to show this functionality)
- (how are they capturing data) 
- add a neurostream link for collecting muse data
- max recording needed 



changes todo (04/01):
- icon changes
- can we package everthing to server side?
- prep for the call @ 11 
- start and countdown logic 
- logic to record the video so we can post process it later
- figure out the number of frames per second
- can we remove some of the coordinates from the data?
- can we downsample some of the coords or the gestures?
- are we able to record muse when the video is getting captured? meaning record the raw samples
- do we need to pair device or direct record works?
- visualize the data to see if it is dummy or not 
- containerize the app using podman 
- check how much space each 1 min video takes
- check how much space each 1 min of gestures etc data takes + muse
- button for start and stop
- check how much duration i can take for one person 
- check if i can record video instead and apply gestures in post
- eeg data needs to recorded concurrently with the video
- deploy - check what ports need to be opened, check if port 3k is working


changes (04/18):
- fix containrization issues for server
- containerize the setup and deploy 
- box for muse, need original vid as well
- readme for the setup 
- instructions to reproduce the setup on local 




some changes made that needs to be documented:
- python muselsl - changed code in record.py, documented in github
- arm -> amd, for containerization, document the commands
  - <document it here>
- started with ubuntu 22 container instead of python
- if we install conda we need to either deactivate it set the PATH=$PATH:<conda_path> so python is not picked up from conda
- liblsl is picked up from the deb package and not the pip package
- liblsl has some dependencies that need to be installed before
  - <document it here>
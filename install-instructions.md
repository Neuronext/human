# Environment Setup and Project Execution Guide

## Step 0: Setting up Rosetta Emulator
Kill all the instances of Terminal using Force quit -> Applications -> Get Info -> Open using Rosetta
Alternatively you can use this command though it will kill all the terminal instances
```bash
arch -x86_64 bash  
```

## Step 1: Installing Homebrew and conda
Check if Homebrew is installed and install if it's not available:
```bash
which brew || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# The following command will appear at the end of installation of Homebrew, please verify and run it
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

## Step 2: Installing Conda
Start a Rosetta emulated environment and install Anaconda for managing Python versions and packages.
```bash
# Install Anaconda (Assuming Anaconda installer is downloaded)
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh
chmod +x Miniconda3-latest-MacOSX-x86_64.sh
bash Miniconda3-latest-MacOSX-x86_64.sh
# Please export the path. Please replace <username> with your username. To get the username run `whoami` in terminal
export PATH="/Users/<username>/minconda3/bin:$PATH"
conda init
```
Now restart the terminal again for conda to take effect.

## Step 3: Installing LSL
Install the LabStreamingLayer (LSL) using Homebrew and set the environment variable:
```bash
conda create -n muse python=3.11 -y
conda activate muse
conda install -c conda-forge liblsl
pip install pylsl
pip install --no-cache-dir git+https://github.com/pratikshapi/muse-lsl.git
echo 'conda activate muse' >> ~/.zshrc
source ~/.zshrc
# These steps are not required if you have installed via conda (which is platform independent)
# brew install labstreaminglayer/tap/lsl
# export DYLD_LIBRARY_PATH=/opt/homebrew/lib
```
## Step 3: Install Git
Install Git using Homebrew:
```bash
brew install git
```

## Step 4: Installing Node.js
Install Node.js using Homebrew and set up the environment:
```bash
brew install node@18
# the following command will appear at the end of installation of node@18, please verify and run it
echo 'export PATH="/opt/homebrew/opt/node@18/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```
Test if the node got installed using these commands
```bash
node -v
npm -v
```
## Step 5: Install dependencies for Human
Install the necessary packages for Human:
```bash
brew install pkg-config cairo pango libpng jpeg giflib librsvg
# check if there are any export statement like below, add it to .zshrc and then source the .zshrc file
echo 'export PATH="/opt/homebrew/opt/jpeg/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

## Step 6: Cloning and Setting up the Human Repository
Clone the Human repository and install necessary Node packages:
```bash
git clone https://github.com/Neuronext/human
cd human
# Try running the following.
npm install
```

We have found some issues in installing tfjs-node-gpu, tfjs-node so might have to manually follow these stpes
- Go to package.json and remove the tfjs-node-gpu and tfjs-node dependencies
- Run the following commands
```bash
npm rebuild @tensorflow/tfjs-node-gpu --build-from-source
npm rebuild @tensorflow/tfjs-node --build-from-source 
npm install
```

## Step 7: Running the Demo
We use two different terminals to run the demo. In the first terminal, navigate to the `demo` folder and run the server:
```bash
cd demo
npm install -g nodemon
nodemon server.js
```
If `nodemon` does not work you can simply run `node server.js`
In the second terminal, navigate to the `human` folder and run the development client:
```bash
cd ../human
npm run dev
```

This guide ensures that all necessary tools and dependencies are installed and correctly configured for the project to run smoothly.



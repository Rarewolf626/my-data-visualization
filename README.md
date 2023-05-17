![My Data Logo](./src/assets/logo.png)
![Project stack](./src/assets/techstack.png)


# My Data

Description: My Data is a React desktop application that uses Electron. It is designed to allow users to view their data usage on a computer. This project was developed for the 2023 Inatel's Hackathon.

## Installation
### Pre-requisites: 
- Python3
- Npcap (or Libpcap)

To install and run the My Data application locally, follow these steps:

1. Clone the repository:


        git clone https://github.com/juliocjuri/my-data.git


2. Navigate to the project directory:

        cd my-data

3. Install the node dependencies:

       npm install

4. Install python dependencies:
        
        cd src/connection
        pip install -r requirements.txt


## Usage

To start the My Data application, use the following command:
    
    npm start

In order to launch npm start, you'll need to generate a build of the react application. If you want to simulate only the react application, without electron, simply run 'npm run dev'. This will automatically start the application as a simple vite application.

The application will launch, and you will be able to observe data usage on your computer.



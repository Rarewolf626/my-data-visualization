const net = require('net');

const HOST = '127.0.0.1';
const PORT_NETWORK_TRAFFIC = 50000;
const PORT_PROTOCOL_TRAFFIC = 50001;
const PORT_HOSTNAME_TRAFFIC = 50002;

/* Para utilizar esse exemplo com o traffic_analyzer_v2.py, remova as seguintes linhas:
*  5-6, 18-26, 33-39, 46-52, 59-65
*/

// Connect to the server socket
const network_client = new net.Socket();
network_client.connect(PORT_NETWORK_TRAFFIC, HOST, () => {
    console.log('Conectado ao provedor de trafégo por aplicativo.');
});

const protocol_client = new net.Socket();
protocol_client.connect(PORT_PROTOCOL_TRAFFIC, HOST, () => {
    console.log('Conectado ao provedor de trafégo por protocolo de rede.');
});

const hostname_client = new net.Socket();
hostname_client.connect(PORT_HOSTNAME_TRAFFIC, HOST, () => {
    console.log('Conectado ao provedor de trafégo por hosts.');
});

// Receive data from the server
network_client.on('data', (data) => {
    console.log('Dado recebido do network_client:', data.toString());
});

protocol_client.on('data', (data) => {
    console.log('Dado recebido do protocol_client:', data.toString());
});

hostname_client.on('data', (data) => {
    console.log('Dado recebido do hostname_client:', data.toString());
});

// Handle errors
network_client.on('error', (error) => {
    console.error('Erro recebido no network_client:', error);
});

protocol_client.on('error', (error) => {
    console.error('Erro recebido no protocol_client:', error);
});

hostname_client.on('error', (error) => {
    console.error('Erro recebido no hostname_client:', error);
});

// Close the connection when done
network_client.on('close', () => {
    console.log('Conexão encerrada com o network_client.');
});

protocol_client.on('close', () => {
    console.log('Conexão encerrada com o protocol_client.');
});

hostname_client.on('close', () => {
    console.log('Conexão encerrada com o hostname_client.');
});
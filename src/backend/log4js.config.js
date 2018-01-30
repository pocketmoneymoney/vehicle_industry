
module.exports = config = {};

config.appenders = [
    { type: 'console'},
    {
        type: 'file',
        filename: 'server.log',
        backups: 3,
        layout: {
            type: 'pattern',
            'pattern': "[%d{yyyy-MM-ddThh:mm:ss.SSSO}] [%p] %c - %m"
        }
    }
];

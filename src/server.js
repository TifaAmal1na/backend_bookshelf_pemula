import Hapi from '@hapi/hapi'; // Menggunakan sintaks ES module untuk mengimpor Hapi
import routes from './routes.js'; // Menggunakan sintaks ES module untuk mengimpor routes

const init = async () => {
    const server = Hapi.server({
        port: 9000, // Kriteria 1
        host: 'localhost',
    });

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// Memanggil fungsi init untuk memulai server
init();

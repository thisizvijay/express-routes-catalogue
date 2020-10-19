import express = require('express');

declare class RoutesList {
    static terminal(app: express.Application): void;
    static web(app: express.Application, path: string): void;
}
export default RoutesList;

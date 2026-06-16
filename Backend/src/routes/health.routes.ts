import express from "express";
import type { Request, Response } from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    const dbState = mongoose.connection.readyState;

    const dbStatus = ["disconnected", "connected", "connecting", "disconnecting"][dbState];

    res.status(200).json({
        status: "ok",
        app: "TruthWall API",
        database: dbStatus,
        timestamp: new Date().toISOString(),
    });
});

export default router;

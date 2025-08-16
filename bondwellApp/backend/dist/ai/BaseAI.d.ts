interface BaseAiInterface {
    create: (msg: string, callback: (response: any) => void) => Promise<void>;
    connect: () => void;
    addSettings: (data: Record<string, any>) => void;
}
export declare class BaseAI implements BaseAiInterface {
    create(msg: string, callback: (response: any) => void): Promise<void>;
    connect(): void;
    addSettings(): void;
}
export {};
//# sourceMappingURL=BaseAI.d.ts.map
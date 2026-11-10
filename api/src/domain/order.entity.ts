import { IsString, IsNumber, IsDate, IsEnum } from 'class-validator';

export enum OrderStatus {
    CREATED = 'CREATED',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export class Order {
    @IsString()
    id: string;

    @IsString()
    customerId: string;

    @IsNumber()
    amount: number;

    @IsEnum(OrderStatus)
    status: OrderStatus;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    constructor(
        id: string,
        customerId: string,
        amount: number,
        status: OrderStatus,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this.id = id;
        this.customerId = customerId;
        this.amount = amount;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    updateStatus(newStatus: OrderStatus): void {
        this.status = newStatus;
        this.updatedAt = new Date();
    }
}
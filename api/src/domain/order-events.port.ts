import { Observable } from 'rxjs';
import { Order } from './order.entity';

/**
 * Puerto de dominio para publicar eventos relacionados con órdenes.
 * Define el contrato que la capa de infraestructura debe implementar
 * para notificar cambios en las órdenes.
 */
export interface OrderEventsPort {
    /**
     * Publica un evento de orden.
     * @param event Tipo de evento (CREATED, UPDATED, DELETED)
     * @param order Orden asociada al evento
     */
    publishOrderEvent(event: OrderEventType, order: Order): Promise<void>;

    /**
     * Devuelve un observable de eventos de órdenes.
     * Los consumidores pueden suscribirse a este stream para
     * recibir actualizaciones en tiempo real.
     */
    getOrderEvents(): Observable<OrderEvent>;
}

export enum OrderEventType {
    CREATED = 'CREATED',
    UPDATED = 'UPDATED',
    DELETED = 'DELETED'
}

export class OrderEvent {
    constructor(
        public readonly eventType: OrderEventType,
        public readonly order: Order,
        public readonly timestamp: Date = new Date()
    ) {}
}
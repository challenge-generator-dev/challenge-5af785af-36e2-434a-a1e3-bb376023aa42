export interface OrderEvent {
  id: string;
  orderId: string;
  type: 'CREATED' | 'UPDATED' | 'DELETED';
  timestamp: string;
  data: Record<string, unknown>;
}
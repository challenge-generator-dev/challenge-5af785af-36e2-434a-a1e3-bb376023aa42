# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/src/infrastructure/kafka/kafka-consumer.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `api/src/application/order-events.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | Apache Kafka |
| `client` | `client/` | chapter, support | client | Angular | Angular |
| `infra-local` | (raiz) | support | infra | Compose local | Apache Kafka |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `GET /order-events`

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos que la arquitectura del reto declara y no estan

Creálos con implementacion real, en la capa que les corresponde:

- `client/src/app/features/orders/orders.component.scss`

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/src/infrastructure/kafka/kafka-consumer.service.spec.ts` — `KafkaConsumerService.connect`: Se invoca `connect` sobre `KafkaConsumerService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/kafka/kafka-consumer.service.spec.ts` — `KafkaConsumerService.subscribeToTopic`: Se invoca `subscribeToTopic` sobre `KafkaConsumerService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/kafka/kafka-consumer.service.spec.ts` — `KafkaConsumerService.consumeMessages`: Se invoca `consumeMessages` sobre `KafkaConsumerService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/package.json` — `@nestjs/event-emitter@11.0.0`: @nestjs/event-emitter declara la version exacta 11.0.0, que no esta publicada: `npm install` falla con ETARGET. Reemplazala por una version publicada real.
- `client/src/app/core/services/order-events.service.spec.ts` — `OrderEventsService.orders`: Se invoca `orders` sobre `OrderEventsService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/core/services/order-events.service.spec.ts` — `OrderEventsService.error`: Se invoca `error` sobre `OrderEventsService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/core/services/order-events.service.spec.ts` — `OrderEventsService.isConnected`: Se invoca `isConnected` sobre `OrderEventsService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/features/orders/orders.component.spec.ts` — `OrdersComponent.reconnect`: Se invoca `reconnect` sobre `OrdersComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Advanced L2

### Brecha de conocimiento
Publicar y consumir eventos en un topic Kafka y mostrarlos en tiempo real (corrida e2e 20261109184921254), Publica y consume eventos de un topic Kafka y refleja los mensajes en la interfaz

### Misión / candidato
Mostrar en vivo el estado de las ordenes

### Reto
- Tema: Consumo de eventos en tiempo real con Kafka
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de visualización en tiempo real de órdenes
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial del consumidor de Kafka — objetivo: Configurar y probar la conexión con el topic de Kafka para consumir eventos. — entregable (NO resolver): Consumidor de Kafka configurado y probado, capaz de mostrar mensajes de eventos en la interfaz.
- Fase 2: Procesamiento y visualización de eventos — objetivo: Implementar la lógica para procesar y mostrar los eventos de órdenes en la interfaz. — entregable (NO resolver): Interfaz de usuario actualizada que muestra los eventos de órdenes en tiempo real.
- Fase 3: Optimización y pruebas — objetivo: Optimizar el rendimiento y realizar pruebas exhaustivas del sistema. — entregable (NO resolver): Sistema optimizado y documentado, con pruebas unitarias y de integración realizadas.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "order-tracking-system",
  "version": "1.0.0",
  "description": "Sistema de seguimiento de órdenes en tiempo real con Kafka",
  "main": "dist/main.js",
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/config": "^3.1.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.1.13",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "kafkajs": "^2.2.4",
    "rxjs": "^7.8.1",
    "@nestjs/event-emitter": "11.0.0"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.8",
    "@types/node": "^20.8.10",
    "@types/supertest": "^2.0.15",
    "@typescript-eslint/eslint-plugin": "^6.9.1",
    "@typescript-eslint/parser": "^6.9.1",
    "eslint": "^8.52.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.1",
    "jest": "^29.7.0",
    "prettier": "^3.0.3",
    "rimraf": "^5.0.5",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.0",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.2.2"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}


// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2017",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist", "test", "**/*.spec.ts"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './common/exceptions/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuración de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configuración de filtro global de excepciones
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Order Tracking System API')
    .setDescription('API para seguimiento de órdenes en tiempo real')
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.PORT || 3000}`, 'Local environment')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configuración del puerto
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap application:', err);
  process.exit(1);
});

// === ARCHIVO: api/src/domain/order.entity.ts ===
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

// === ARCHIVO: api/src/domain/order-events.port.ts ===
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

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GlobalExceptionFilter } from './common/exceptions/global-exception.filter';
import { OrderEventsController } from './infrastructure/controllers/order-events.controller';
import { KafkaModule } from './infrastructure/kafka/kafka.module';
import { KafkaConfig } from './config/kafka.config';
import { OrderEventsService } from './application/order-events.service';
import { OrderEventsPort } from './domain/order-events.port';
import { KafkaConsumerService } from './infrastructure/kafka/kafka-consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [() => ({
        KAFKA_BROKER: process.env.KAFKA_BROKER || 'localhost:9092',
        KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'order-tracking-system',
        KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID || 'order-tracking-consumer-group',
        KAFKA_TOPIC: process.env.KAFKA_TOPIC || 'order-events',
        PORT: parseInt(process.env.PORT || '3000', 10),
      })],
    }),
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      verboseMemoryLeak: true,
    }),
    KafkaModule,
  ],
  controllers: [OrderEventsController],
  providers: [
    OrderEventsService,
    {
      provide: OrderEventsPort,
      useExisting: KafkaConsumerService,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: KafkaConfig,
      useFactory: (configService: ConfigService) => {
        return {
          broker: configService.get<string>('KAFKA_BROKER'),
          clientId: configService.get<string>('KAFKA_CLIENT_ID'),
          groupId: configService.get<string>('KAFKA_GROUP_ID'),
          topics: [configService.get<string>('KAFKA_TOPIC')],
        };
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}

// === ARCHIVO: api/src/application/order-events.service.ts ===
import { Injectable, Logger, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { Subject, Observable, filter, map, catchError, finalize, takeUntil } from 'rxjs';
import { OrderEventsPort, OrderEventType, OrderEvent } from '../domain/order-events.port';
import { Order, OrderStatus } from '../domain/order.entity';

interface StreamEvent {
  type: string;
  orderId: string;
  timestamp: string;
  data: Record<string, unknown>;
}

@Injectable()
export class OrderEventsService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OrderEventsService.name);
  private readonly eventSubject = new Subject<StreamEvent>();
  private readonly destroy$ = new Subject<void>();
  private isConnected = false;
  private connectionAttempts = 0;
  private readonly maxRetries = 5;

  constructor(
    @Inject(OrderEventsPort)
    private readonly orderEventsPort: OrderEventsPort,
  ) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('Inicializando OrderEventsService');
    await this.initializeConnection();
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Cerrando OrderEventsService');
    this.destroy$.next();
    this.destroy$.complete();
    this.eventSubject.complete();
  }

  private async initializeConnection(): Promise<void> {
    try {
      this.connectionAttempts++;
      this.logger.debug(`Intento de conexión #${this.connectionAttempts}`);
      
      const events$ = this.orderEventsPort.getOrderEvents();
      
      events$
        .pipe(
          takeUntil(this.destroy$),
          filter((event) => event !== null && event !== undefined),
          map((event) => this.transformToStreamEvent(event)),
          catchError((error) => {
            this.logger.error('Error en stream de eventos', error);
            this.isConnected = false;
            return this.handleConnectionError(error);
          }),
          finalize(() => {
            this.logger.warn('Stream de eventos finalizado');
            this.isConnected = false;
          })
        )
        .subscribe({
          next: (streamEvent) => {
            if (streamEvent) {
              this.eventSubject.next(streamEvent);
              this.logger.debug(`Evento procesado: ${streamEvent.type}`);
            }
          },
          error: (error) => {
            this.logger.error(`Error en suscripción: ${error.message}`);
            this.isConnected = false;
          },
          complete: () => {
            this.logger.log('Suscripción completada');
            this.isConnected = false;
          },
        });

      this.isConnected = true;
      this.connectionAttempts = 0;
      this.logger.log('Conexión con Kafka establecida correctamente');
    } catch (error) {
      this.logger.error(`Error al inicializar conexión: ${error.message}`);
      this.isConnected = false;
      await this.retryConnection();
    }
  }

  private handleConnectionError(error: Error): Observable<never> {
    this.logger.error(`Error de conexión: ${error.message}`);
    this.isConnected = false;
    
    if (this.connectionAttempts < this.maxRetries) {
      this.retryConnection();
    }
    
    throw error;
  }

  private async retryConnection(): Promise<void> {
    if (this.connectionAttempts >= this.maxRetries) {
      this.logger.error(
        `Máximo de intentos de conexión alcanzado (${this.maxRetries}). No se reconectará automáticamente.`
      );
      return;
    }

    const delay = Math.min(1000 * Math.pow(2, this.connectionAttempts), 30000);
    this.logger.log(`Reintentando conexión en ${delay}ms...`);
    
    setTimeout(async () => {
      await this.initializeConnection();
    }, delay);
  }

  private transformToStreamEvent(event: OrderEvent): StreamEvent | null {
    if (!event || !event.type || !event.order) {
      this.logger.warn('Evento inválido recibido, ignorando');
      return null;
    }

    const orderData = event.order;
    let statusData: Record<string, unknown> = {};

    if (orderData instanceof Order) {
      statusData = {
        id: orderData.id,
        status: orderData.status,
        customerId: orderData.customerId,
        totalAmount: orderData.totalAmount,
        createdAt: orderData.createdAt,
        updatedAt: orderData.updatedAt,
      };
    }

    return {
      type: event.type,
      orderId: orderData?.id || 'unknown',
      timestamp: event.timestamp || new Date().toISOString(),
      data: statusData,
    };
  }

  getOrderEventsStream(): Observable<StreamEvent> {
    return this.eventSubject.asObservable();
  }

  getConnectionStatus(): { connected: boolean; attempts: number } {
    return {
      connected: this.isConnected,
      attempts: this.connectionAttempts,
    };
  }

  async publishTestEvent(orderId: string, eventType: OrderEventType): Promise<void> {
    const testOrder = new Order(
      orderId,
      OrderStatus.PENDING,
      'test-customer',
      0,
      new Date(),
      new Date(),
    );

    await this.orderEventsPort.publishOrderEvent(eventType, testOrder);
    this.logger.log(`Evento de prueba publicado: ${eventType} para orden ${orderId}`);
  }
}

// === ARCHIVO: api/src/application/order-events.service.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { OrderEventsService } from './order-events.service';
import { OrderEventsPort, OrderEvent, OrderEventType } from '../domain/order-events.port';
import { Order, OrderStatus } from '../domain/order.entity';
import { Observable, of, throwError, Subject } from 'rxjs';

describe('OrderEventsService', () => {
  let service: OrderEventsService;
  let mockPort: jest.Mocked<OrderEventsPort>;
  let eventSubject: Subject<OrderEvent>;

  const mockOrder = new Order(
    'order-123',
    OrderStatus.PENDING,
    'customer-456',
    100.50,
    new Date(),
    new Date(),
  );

  beforeEach(async () => {
    eventSubject = new Subject<OrderEvent>();
    
    mockPort = {
      publishOrderEvent: jest.fn().mockResolvedValue(undefined),
      getOrderEvents: jest.fn().mockReturnValue(eventSubject.asObservable()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderEventsService,
        {
          provide: OrderEventsPort,
          useValue: mockPort,
        },
      ],
    }).compile();

    service = module.get<OrderEventsService>(OrderEventsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('onModuleInit', () => {
    it('debe establecer conexión con el puerto de eventos', async () => {
      await service.onModuleInit();
      expect(mockPort.getOrderEvents).toHaveBeenCalled();
    });

    it('debe manejar errores de conexión correctamente', async () => {
      const errorPort = {
        publishOrderEvent: jest.fn().mockResolvedValue(undefined),
        getOrderEvents: jest.fn().mockReturnValue(throwError(() => new Error('Connection failed'))),
      };

      const errorModule: TestingModule = await Test.createTestingModule({
        providers: [
          OrderEventsService,
          {
            provide: OrderEventsPort,
            useValue: errorPort,
          },
        ],
      }).compile();

      const errorService = errorModule.get<OrderEventsService>(OrderEventsService);
      await expect(errorService.onModuleInit()).rejects.toThrow('Connection failed');
    });
  });

  describe('getOrderEventsStream', () => {
    it('debe retornar un observable de eventos', async () => {
      await service.onModuleInit();
      const stream = service.getOrderEventsStream();
      expect(stream).toBeInstanceOf(Observable);
    });

    it('debe emitir eventos cuando el puerto emite', async () => {
      await service.onModuleInit();
      const events: any[] = [];
      
      service.getOrderEventsStream().subscribe((event) => {
        events.push(event);
      });

      const mockEvent: OrderEvent = {
        type: OrderEventType.ORDER_CREATED,
        order: mockOrder,
        timestamp: new Date().toISOString(),
      };

      eventSubject.next(mockEvent);
      expect(events.length).toBeGreaterThan(0);
    });
  });

  describe('getConnectionStatus', () => {
    it('debe retornar estado de conexión inicial', () => {
      const status = service.getConnectionStatus();
      expect(status).toHaveProperty('connected');
      expect(status).toHaveProperty('attempts');
    });
  });

  describe('publishTestEvent', () => {
    it('debe publicar un evento de prueba', async () => {
      await service.publishTestEvent('order-999', OrderEventType.ORDER_UPDATED);
      expect(mockPort.publishOrderEvent).toHaveBeenCalledWith(
        OrderEventType.ORDER_UPDATED,
        expect.any(Order),
      );
    });
  });

  describe('manejo de errores', () => {
    it('debe manejar eventos nulos o indefinidos', async () => {
      await service.onModuleInit();
      const events: any[] = [];
      
      service.getOrderEventsStream().subscribe((event) => {
        events.push(event);
      });

      eventSubject.next(null as any);
      eventSubject.next(undefined as any);
    });
  });
});

// === ARCHIVO: api/src/infrastructure/kafka/kafka.module.ts ===
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaConsumerService } from './kafka-consumer.service';

@Global()
@Module({
  providers: [
    {
      provide: 'KAFKA_CONFIG',
      useFactory: (configService: ConfigService) => ({
        clientId: configService.get<string>('KAFKA_CLIENT_ID', 'order-tracking-system'),
        brokers: [
          configService.get<string>('KAFKA_BROKER', 'localhost:9092')
        ],
        ssl: configService.get<boolean>('KAFKA_SSL', false),
        sasl: configService.get<boolean>('KAFKA_SASL', false) ? {
          mechanism: configService.get<string>('KAFKA_SASL_MECHANISM', 'plain'),
          username: configService.get<string>('KAFKA_SASL_USERNAME', ''),
          password: configService.get<string>('KAFKA_SASL_PASSWORD', ''),
        } : undefined,
        retry: {
          initialRetryTime: 100,
          retries: 8,
        },
      }),
      inject: [ConfigService],
    },
    KafkaConsumerService,
  ],
  exports: [KafkaConsumerService],
})
export class KafkaModule {}

// === ARCHIVO: api/src/infrastructure/kafka/kafka-consumer.service.ts ===
import { Injectable, OnModuleInit, OnModuleDestroy, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { Observable, Subject, catchError, finalize, from, of } from 'rxjs';
import { map, tap, share } from 'rxjs/operators';
import { OrderEvent, OrderEventType } from '../../domain/order-events.port';

export interface KafkaConfig {
  clientId: string;
  brokers: string[];
  ssl?: boolean;
  sasl?: {
    mechanism: string;
    username: string;
    password: string;
  };
  retry?: {
    initialRetryTime: number;
    retries: number;
  };
}

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaConsumerService.name);
  private kafka: Kafka;
  private consumer: Consumer;
  private readonly eventSubject = new Subject<OrderEvent>();
  private isConnected = false;
  private readonly topicName: string;
  private readonly groupId: string;

  constructor(
    @Inject('KAFKA_CONFIG') private readonly kafkaConfig: KafkaConfig,
    private readonly configService: ConfigService,
  ) {
    this.topicName = configService.get<string>('KAFKA_TOPIC', 'order-events');
    this.groupId = configService.get<string>('KAFKA_GROUP_ID', 'order-tracking-group');
  }

  async onModuleInit(): Promise<void> {
    this.kafka = new Kafka({
      clientId: this.kafkaConfig.clientId,
      brokers: this.kafkaConfig.brokers,
      ssl: this.kafkaConfig.ssl,
      sasl: this.kafkaConfig.sasl,
      retry: this.kafkaConfig.retry,
    });

    this.consumer = this.kafka.consumer({ groupId: this.groupId });
    
    try {
      await this.consumer.connect();
      this.isConnected = true;
      this.logger.log(`Connected to Kafka broker: ${this.kafkaConfig.brokers.join(', ')}`);
      
      await this.consumer.subscribe({ topic: this.topicName, fromBeginning: false });
      this.logger.log(`Subscribed to topic: ${this.topicName}`);
      
      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          await this.handleMessage(payload);
        },
      });
    } catch (error) {
      this.logger.error(`Failed to initialize Kafka consumer: ${error.message}`, error.stack);
      this.isConnected = false;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      if (this.consumer) {
        await this.consumer.disconnect();
        this.logger.log('Kafka consumer disconnected successfully');
      }
    } catch (error) {
      this.logger.error(`Error disconnecting Kafka consumer: ${error.message}`, error.stack);
    }
  }

  private async handleMessage(payload: EachMessagePayload): Promise<void> {
    const { topic, partition, message } = payload;
    
    if (!message.value) {
      this.logger.warn(`Received empty message on ${topic}[${partition}]`);
      return;
    }

    try {
      const eventData = JSON.parse(message.value.toString());
      const orderEvent: OrderEvent = {
        id: message.key?.toString() || `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: this.mapEventType(eventData.type),
        orderId: eventData.orderId,
        order: eventData.order,
        timestamp: new Date(eventData.timestamp || message.timestamp),
        metadata: {
          topic,
          partition,
          offset: message.offset,
        },
      };

      this.eventSubject.next(orderEvent);
      this.logger.debug(`Processed event: ${orderEvent.type} for order ${orderEvent.orderId}`);
    } catch (error) {
      this.logger.error(`Failed to process message: ${error.message}`, error.stack);
    }
  }

  private mapEventType(type: string): OrderEventType {
    const typeMapping: Record<string, OrderEventType> = {
      'ORDER_CREATED': OrderEventType.ORDER_CREATED,
      'ORDER_UPDATED': OrderEventType.ORDER_UPDATED,
      'ORDER_CANCELLED': OrderEventType.ORDER_CANCELLED,
      'ORDER_COMPLETED': OrderEventType.ORDER_COMPLETED,
      'ORDER_STATUS_CHANGED': OrderEventType.ORDER_STATUS_CHANGED,
    };
    return typeMapping[type] || OrderEventType.ORDER_UPDATED;
  }

  getOrderEvents(): Observable<OrderEvent> {
    return this.eventSubject.asObservable().pipe(
      tap(event => this.logger.debug(`Emitting event: ${event.type}`)),
      share(),
    );
  }

  getConnectionStatus(): { connected: boolean; topic: string; groupId: string } {
    return {
      connected: this.isConnected,
      topic: this.topicName,
      groupId: this.groupId,
    };
  }

  async reconnect(): Promise<boolean> {
    try {
      if (this.consumer) {
        await this.consumer.disconnect();
      }
      
      this.consumer = this.kafka.consumer({ groupId: this.groupId });
      await this.consumer.connect();
      this.isConnected = true;
      
      await this.consumer.subscribe({ topic: this.topicName, fromBeginning: false });
      
      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          await this.handleMessage(payload);
        },
      });
      
      this.logger.log('Kafka consumer reconnected successfully');
      return true;
    } catch (error) {
      this.logger.error(`Failed to reconnect: ${error.message}`, error.stack);
      this.isConnected = false;
      return false;
    }
  }
}

// === ARCHIVO: api/src/infrastructure/controllers/order-events.controller.ts ===
import { Controller, Get, Res, HttpStatus, Logger, Header } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { KafkaConsumerService } from '../kafka/kafka-consumer.service';
import { OrderEvent } from '../../domain/order-events.port';

@Controller('order-events')
export class OrderEventsController {
  private readonly logger = new Logger(OrderEventsController.name);

  constructor(private readonly kafkaConsumerService: KafkaConsumerService) {}

  @Get()
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  @Header('X-Accel-Buffering', 'no')
  getOrderEvents(@Res() res: Response): void {
    const connectionStatus = this.kafkaConsumerService.getConnectionStatus();
    
    this.logger.log(`SSE connection established. Kafka connected: ${connectionStatus.connected}`);
    
    if (!connectionStatus.connected) {
      this.sendSSEEvent(res, {
        id: `error-${Date.now()}`,
        type: 'CONNECTION_ERROR',
        orderId: 'system',
        order: null,
        timestamp: new Date(),
        metadata: {
          message: 'Kafka consumer is not connected. Please check Kafka broker availability.',
          topic: connectionStatus.topic,
          groupId: connectionStatus.groupId,
        },
      });
    }

    const heartbeatInterval = setInterval(() => {
      this.sendSSEEvent(res, {
        id: `heartbeat-${Date.now()}`,
        type: 'HEARTBEAT',
        orderId: 'system',
        order: null,
        timestamp: new Date(),
        metadata: { connected: connectionStatus.connected },
      });
    }, 30000);

    const subscription = this.kafkaConsumerService.getOrderEvents().subscribe({
      next: (event: OrderEvent) => {
        this.sendSSEEvent(res, event);
      },
      error: (error: Error) => {
        this.logger.error(`Stream error: ${error.message}`);
        this.sendSSEEvent(res, {
          id: `error-${Date.now()}`,
          type: 'STREAM_ERROR',
          orderId: 'system',
          order: null,
          timestamp: new Date(),
          metadata: { message: error.message },
        });
      },
      complete: () => {
        this.logger.log('Event stream completed');
        clearInterval(heartbeatInterval);
        res.end();
      },
    });

    res.on('close', () => {
      this.logger.log('Client disconnected from SSE');
      clearInterval(heartbeatInterval);
      subscription.unsubscribe();
    });
  }

  private sendSSEEvent(res: Response, event: OrderEvent): void {
    const sseData = `id: ${event.id}\n` +
      `type: ${event.type}\n` +
      `orderId: ${event.orderId}\n` +
      `data: ${JSON.stringify(event)}\n\n`;
    
    res.write(sseData);
  }
}

// === ARCHIVO: api/src/config/kafka.config.ts ===
import { registerAs } from '@nestjs/config';

export interface KafkaConfig {
  brokers: string[];
  groupId: string;
  clientId: string;
  topics: {
    orderEvents: string;
  };
  retry: {
    initialRetryTime: number;
    retries: number;
  };
}

export const kafkaConfig = registerAs('kafka', (): KafkaConfig => {
  const brokersEnv = process.env.KAFKA_BROKERS || 'localhost:9092';
  const brokers = brokersEnv.split(',').map(b => b.trim());

  return {
    brokers,
    groupId: process.env.KAFKA_GROUP_ID || 'order-tracking-group',
    clientId: process.env.KAFKA_CLIENT_ID || 'order-tracking-client',
    topics: {
      orderEvents: process.env.KAFKA_TOPIC_ORDER_EVENTS || 'order-events',
    },
    retry: {
      initialRetryTime: parseInt(process.env.KAFKA_RETRY_TIME || '1000', 10),
      retries: parseInt(process.env.KAFKA_RETRY_ATTEMPTS || '8', 10),
    },
  };
});

export const KAFKA_CONFIG_TOKEN = 'KAFKA_CONFIG';

// === ARCHIVO: api/src/common/exceptions/global-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Kafka } from 'kafkajs';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  details?: unknown;
}

export class KafkaConnectionError extends Error {
  constructor(message: string, public readonly originalError?: Error) {
    super(message);
    this.name = 'KafkaConnectionError';
  }
}

export class KafkaConsumerError extends Error {
  constructor(message: string, public readonly topic?: string) {
    super(message);
    this.name = 'KafkaConsumerError';
  }
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger: LoggerService;

  constructor() {
    this.logger = new Logger(GlobalExceptionFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';
    let details: unknown = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resp = exceptionResponse as Record<string, unknown>;
        message = (resp.message as string) || message;
        error = (resp.error as string) || error;
        details = resp.details;
      }
    } else if (exception instanceof KafkaConnectionError) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'Kafka broker unavailable';
      error = 'Service Unavailable';
      details = {
        service: 'kafka',
        reason: 'Unable to connect to Kafka broker',
        originalError: exception.originalError?.message,
      };
      this.logger.error(
        `Kafka connection failed: ${exception.message}`,
        exception.stack,
      );
    } else if (exception instanceof KafkaConsumerError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = `Kafka consumer error: ${exception.message}`;
      error = 'Kafka Consumer Error';
      details = {
        topic: exception.topic,
      };
      this.logger.error(
        `Kafka consumer error: ${exception.message}`,
        exception.stack,
      );
    } else if (exception instanceof Error) {
      message = exception.message;
      
      if (exception.name === 'KafkaJSConnectionError' || exception.message.includes('connect ECONNREFUSED')) {
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = 'Kafka broker is not reachable';
        error = 'Service Unavailable';
        details = {
          service: 'kafka',
          reason: 'Connection refused',
        };
      } else if (exception.name === 'KafkaJSBrokerNotAvailable') {
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = 'Kafka broker not available';
        error = 'Service Unavailable';
      }
      
      this.logger.error(
        `Unhandled exception: ${exception.message}`,
        exception.stack,
      );
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (details) {
      errorResponse.details = details;
    }

    response.status(status).json(errorResponse);
  }
}

// === ARCHIVO: api/src/infrastructure/kafka/kafka-consumer.service.spec.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { KafkaConsumerService } from './kafka-consumer.service';
import { kafkaConfig } from '../../config/kafka.config';

describe('KafkaConsumerService', () => {
  let service: KafkaConsumerService;

  const mockKafkaConfig = {
    brokers: ['localhost:9092'],
    groupId: 'test-group',
    clientId: 'test-client',
    topics: {
      orderEvents: 'order-events',
    },
    retry: {
      initialRetryTime: 1000,
      retries: 8,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KafkaConsumerService,
        {
          provide: 'KAFKA_CONFIG',
          useValue: mockKafkaConfig,
        },
      ],
    }).compile();

    service = module.get<KafkaConsumerService>(KafkaConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('connect', () => {
    it('should establish connection to Kafka broker', async () => {
      // TODO: Implementar prueba de conexión
      // Arrange: Configuración de Kafka mockeada
      // Act: Llamar a service.connect()
      // Assert: Verificar que la conexión se estableció sin errores
    });

    it('should handle connection errors gracefully', async () => {
      // TODO: Implementar prueba de manejo de errores de conexión
      // Arrange: Simular fallo de conexión
      // Act: Llamar a service.connect()
      // Assert: Verificar que se lanza la excepción correcta
    });
  });

  describe('subscribeToTopic', () => {
    it('should subscribe to the specified topic', async () => {
      // TODO: Implementar prueba de suscripción a topic
      // Arrange: Topic mockeado
      // Act: Llamar a service.subscribeToTopic()
      // Assert: Verificar suscripción exitosa
    });

    it('should handle subscription errors', async () => {
      // TODO: Implementar prueba de errores de suscripción
    });
  });

  describe('consumeMessages', () => {
    it('should consume and process messages from topic', async () => {
      // TODO: Implementar prueba de consumo de mensajes
      // Arrange: Mensajes mockeados
      // Act: Llamar a service.consumeMessages()
      // Assert: Verificar procesamiento correcto
    });

    it('should handle malformed messages', async () => {
      // TODO: Implementar prueba de mensajes mal formados
    });
  });

  describe('disconnect', () => {
    it('should disconnect cleanly from Kafka', async () => {
      // TODO: Implementar prueba de desconexión
    });
  });

  describe('error handling', () => {
    it('should emit error event when connection fails', () => {
      // TODO: Verificar que el evento de error se emite correctamente
    });

    it('should implement retry logic for transient errors', async () => {
      // TODO: Verificar que hay reintentos para errores transitorios
    });
  });
});

// === ARCHIVO: api/test/jest-e2e.json ===
{
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}


// === ARCHIVO: client/package.json ===
{
  "name": "order-tracker",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "jest",
    "lint": "ng lint"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "20.0.0",
    "@angular/cdk": "18.0.0",
    "@angular/common": "20.0.0",
    "@angular/compiler": "20.0.0",
    "@angular/core": "20.0.0",
    "@angular/forms": "20.0.0",
    "@angular/material": "18.0.0",
    "@angular/platform-browser": "20.0.0",
    "@angular/platform-browser-dynamic": "20.0.0",
    "@angular/router": "20.0.0",
    "rxjs": "~7.8.1",
    "tslib": "^2.6.2",
    "zone.js": "~0.14.0",
    "@ngrx/effects": "^18.0.0",
    "@ngrx/store": "^18.0.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "20.0.0",
    "@angular-eslint/eslint-plugin": "18.0.0",
    "@angular/cli": "20.0.0",
    "@angular/compiler-cli": "20.0.0",
    "@types/jest": "29.5.12",
    "@types/node": "20.11.24",
    "eslint": "^8.57.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-jsdoc": "^48.2.1",
    "eslint-plugin-prefer-arrow": "^1.2.3",
    "jest": "29.7.0",
    "jest-preset-angular": "14.0.0",
    "typescript": "~5.4.2"
  },
  "engines": {
    "node": ">=22.0.0",
    "npm": ">=10.0.0"
  }
}


// === ARCHIVO: client/angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "order-tracker": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/order-tracker",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
            ],
            "scripts": []
          },
          "configurations": {
            "development": {
              "optimization": false,
              "outputHashing": "all",
              "sourceMap": true,
              "namedChunks": false,
              "extractLicenses": false,
              "vendorChunk": true,
              "buildOptimizer": false
            },
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ]
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "order-tracker:build"
          },
          "configurations": {
            "development": {
              "browserTarget": "order-tracker:build:development"
            },
            "production": {
              "browserTarget": "order-tracker:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "order-tracker:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:jest",
          "options": {
            "tsConfig": "tsconfig.json",
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ]
          }
        },
        "lint": {
          "builder": "@angular-eslint/builder:lint",
          "options": {
            "lintFilePatterns": [
              "src/**/*.ts",
              "src/**/*.html"
            ]
          }
        }
      }
    }
  },
  "cli": {
    "analytics": false,
    "defaultCollection": "@angular-eslint/schematics"
  },
  "schematics": {
    "@schematics/angular:component": {
      "style": "scss",
      "skipTests": false
    },
    "@schematics/angular:application": {
      "strict": true
    }
  }
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": [
      "ES2022",
      "dom",
      "dom.iterable"
    ],
    "paths": {
      "@app/*": [
        "src/app/*"
      ],
      "@env/*": [
        "src/environments/*"
      ]
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  },
  "exclude": [
    "node_modules",
    "**/*.stories.ts"
  ]
}

// === ARCHIVO: client/src/app/core/services/order-events.service.ts ===
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderEvent } from '../models/order-event.model';

@Injectable({
  providedIn: 'root'
})
export class OrderEventsService {
  private readonly apiUrl = 'http://localhost:3000/order-events';
  private eventSource: EventSource | null = null;
  
  orders = signal<OrderEvent[]>([]);
  error = signal<string | null>(null);
  isConnected = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  connect(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
    
    this.eventSource = new EventSource(this.apiUrl);
    
    this.eventSource.onopen = () => {
      this.isConnected.set(true);
      this.error.set(null);
    };
    
    this.eventSource.onmessage = (event) => {
      try {
        const orderEvent: OrderEvent = JSON.parse(event.data);
        this.processOrderEvent(orderEvent);
      } catch (error) {
        this.error.set('Error al parsear el evento recibido');
        console.error('Error parsing event:', error);
      }
    };
    
    this.eventSource.onerror = () => {
      this.isConnected.set(false);
      this.error.set('Error de conexión con el servidor de eventos');
    };
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.isConnected.set(false);
    }
  }

  private processOrderEvent(event: OrderEvent): void {
    const currentOrders = this.orders();
    
    switch (event.type) {
      case 'CREATED':
        this.orders.set([...currentOrders, event]);
        break;
      case 'UPDATED':
        this.orders.update(orders => orders.map(order => 
          order.id === event.id ? { ...order, ...event } : order
        ));
        break;
      case 'DELETED':
        this.orders.update(orders => orders.filter(order => order.id !== event.id));
        break;
      default:
        console.warn('Tipo de evento desconocido:', event.type);
    }
  }

  getConnectionStatus(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      observer.next(this.isConnected());
    });
  }
}

// === ARCHIVO: client/src/app/core/services/order-events.service.spec.ts ===
import { TestBed } from '@angular/core/testing';
import { OrderEventsService } from './order-events.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderEvent } from '../../features/orders/orders.component';

describe('OrderEventsService', () => {
  let service: OrderEventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderEventsService]
    });
    
    service = TestBed.inject(OrderEventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    service.disconnect();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize signals with default values', () => {
    expect(service.orders()).toEqual([]);
    expect(service.error()).toBeNull();
    expect(service.isConnected()).toBeFalse();
  });

  describe('connect', () => {
    it('should set isConnected to true when connection is established', () => {
      service.connect();
      if (service['eventSource']) {
        service['eventSource'].onopen?.(new Event('open'));
      }
      expect(service.isConnected()).toBeTrue();
      expect(service.error()).toBeNull();
    });

    it('should process CREATED order event correctly', () => {
      const mockEvent: OrderEvent = {
        id: '1',
        type: 'CREATED',
        orderId: 'order-1',
        timestamp: new Date().toISOString(),
        details: { status: 'pending', items: [] }
      };
      
      service.connect();
      if (service['eventSource']) {
        service['eventSource'].onmessage?.({
          data: JSON.stringify(mockEvent),
          lastEventId: '',
          origin: '',
          ports: undefined,
          type: 'message'
        } as MessageEvent);
      }
      
      expect(service.orders()).toContain(jasmine.objectContaining(mockEvent));
    });

    it('should process UPDATED order event correctly', () => {
      const initialEvent: OrderEvent = {
        id: '1',
        type: 'CREATED',
        orderId: 'order-1',
        timestamp: new Date().toISOString(),
        details: { status: 'pending', items: [] }
      };
      
      const updatedEvent: OrderEvent = {
        id: '1',
        type: 'UPDATED',
        orderId: 'order-1',
        timestamp: new Date().toISOString(),
        details: { status: 'shipped', items: [] }
      };
      
      service.connect();
      if (service['eventSource']) {
        service['eventSource'].onmessage?.({
          data: JSON.stringify(initialEvent),
          lastEventId: '',
          origin: '',
          ports: undefined,
          type: 'message'
        } as MessageEvent);
      }
      
      if (service['eventSource']) {
        service['eventSource'].onmessage?.({
          data: JSON.stringify(updatedEvent),
          lastEventId: '',
          origin: '',
          ports: undefined,
          type: 'message'
        } as MessageEvent);
      }
      
      expect(service.orders()[0].details.status).toBe('shipped');
    });

    it('should process DELETED order event correctly', () => {
      const initialEvent: OrderEvent = {
        id: '1',
        type: 'CREATED',
        orderId: 'order-1',
        timestamp: new Date().toISOString(),
        details: { status: 'pending', items: [] }
      };
      
      const deleteEvent: OrderEvent = {
        id: '1',
        type: 'DELETED',
        orderId: 'order-1',
        timestamp: new Date().toISOString(),
        details: {}
      };
      
      service.connect();
      if (service['eventSource']) {
        service['eventSource'].onmessage?.({
          data: JSON.stringify(initialEvent),
          lastEventId: '',
          origin: '',
          ports: undefined,
          type: 'message'
        } as MessageEvent);
      }
      
      if (service['eventSource']) {
        service['eventSource'].onmessage?.({
          data: JSON.stringify(deleteEvent),
          lastEventId: '',
          origin: '',
          ports: undefined,
          type: 'message'
        } as MessageEvent);
      }
      
      expect(service.orders().length).toBe(0);
    });

    it('should set error when connection fails', () => {
      service.connect();
      if (service['eventSource']) {
        service['eventSource'].onerror?.(new Event('error'));
      }
      expect(service.isConnected()).toBeFalse();
      expect(service.error()).toBe('Error de conexión con el servidor de eventos');
    });
  });

  describe('disconnect', () => {
    it('should close event source and reset connection state', () => {
      service.connect();
      service.disconnect();
      expect(service['eventSource']).toBeNull();
      expect(service.isConnected()).toBeFalse();
    });
  });

  describe('getConnectionStatus', () => {
    it('should return an observable with current connection status', (done) => {
      service.getConnectionStatus().subscribe(status => {
        expect(status).toBeFalse();
        done();
      });
    });
  });
});

// === ARCHIVO: client/src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Error al iniciar la aplicación Angular:', err));

// === ARCHIVO: client/src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Order Tracker - Seguimiento de Órdenes en Tiempo Real</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Sistema de seguimiento de órdenes en tiempo real con eventos de Kafka">
  <meta name="keywords" content="order tracking, kafka, real-time, eventos">
  <meta name="author" content="Pragma Team">
  <meta name="robots" content="index, follow">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
  <noscript>
    <div style="padding: 20px; text-align: center; font-family: sans-serif;">
      <h1>JavaScript Requerido</h1>
      <p>Esta aplicación requiere JavaScript para funcionar. Por favor, habilite JavaScript en su navegador.</p>
    </div>
  </noscript>
</body>
</html>

// === ARCHIVO: client/src/app/app.config.ts ===
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideStore({}),
    provideEffects([])
  ]
};

// === ARCHIVO: client/src/app/app.component.ts ===
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <div class="sidenav-header">
          <mat-icon>local_shipping</mat-icon>
          <span>Order Tracker</span>
        </div>
        <mat-nav-list>
          <a mat-list-item routerLink="/orders" routerLinkActive="active-link">
            <mat-icon matListItemIcon>list_alt</mat-icon>
            <span matListItemTitle>Órdenes</span>
          </a>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active-link">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/settings" routerLinkActive="active-link">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Configuración</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      
      <mat-sidenav-content class="main-content">
        <mat-toolbar color="primary" class="toolbar">
          <button mat-icon-button (click)="toggleSidenav()">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="toolbar-title">{{ title }}</span>
          <span class="spacer"></span>
          <button mat-icon-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item>
              <mat-icon>person</mat-icon>
              <span>Perfil</span>
            </button>
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Cerrar sesión</span>
            </button>
          </mat-menu>
        </mat-toolbar>
        
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100vh;
      display: flex;
    }
    
    .sidenav {
      width: 280px;
      background: linear-gradient(180deg, #1a237e 0%, #283593 100%);
      border-right: none;
    }
    
    .sidenav-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px 16px;
      color: white;
      font-size: 20px;
      font-weight: 500;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }
    
    .sidenav-header mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }
    
    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: #f5f5f5;
    }
    
    .toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .toolbar-title {
      margin-left: 16px;
      font-weight: 400;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    .content {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
    
    .active-link {
      background-color: rgba(255, 255, 255, 0.1) !important;
      border-left: 3px solid #fff;
    }
    
    ::ng-deep .mat-mdc-list-item {
      color: rgba(255, 255, 255, 0.87) !important;
    }
    
    ::ng-deep .mat-mdc-list-item:hover {
      background-color: rgba(255, 255, 255, 0.08) !important;
    }
  `]
})
export class AppComponent {
  title = 'Order Tracker';
  private sidenavOpened = true;
  
  constructor(private snackBar: MatSnackBar) {}
  
  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }
  
  logout(): void {
    this.snackBar.open('Sesión cerrada correctamente', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }
}

// === ARCHIVO: client/src/app/features/orders/orders.component.ts ===
import { Component, OnInit, OnDestroy, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { OrderEventsService } from '../../core/services/order-events.service';
import { OrderCardComponent } from '../../shared/components/order-card/order-card.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';

export interface Order {
  id: string;
  customerName: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalAmount: number;
  items: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderEvent {
  type: 'created' | 'updated' | 'deleted';
  orderId: string;
  order: Order;
  timestamp: string;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDividerModule,
    OrderCardComponent,
    ErrorMessageComponent
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  private orderEventsService = inject(OrderEventsService);
  
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(true);
  connectionStatus = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  lastUpdate = signal<Date | null>(null);
  
  pendingCount = computed(() => 
    this.orders().filter(o => o.status === 'pending').length
  );
  
  processingCount = computed(() => 
    this.orders().filter(o => o.status === 'processing').length
  );
  
  completedCount = computed(() => 
    this.orders().filter(o => o.status === 'completed').length
  );
  
  totalRevenue = computed(() => 
    this.orders()
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.totalAmount, 0)
  );
  
  constructor() {
    effect(() => {
      const status = this.connectionStatus();
      if (status) {
        console.log('[OrdersComponent] Conexión SSE establecida');
      }
    });
  }
  
  ngOnInit(): void {
    this.initializeEventListeners();
    this.connectToEventStream();
  }
  
  ngOnDestroy(): void {
    this.orderEventsService.disconnect();
  }
  
  private initializeEventListeners(): void {
    this.orderEventsService.getConnectionStatus().subscribe({
      next: (connected) => {
        this.connectionStatus.set(connected);
        if (!connected) {
          this.errorMessage.set('Conexión perdida. Reconectando...');
        } else {
          this.errorMessage.set(null);
        }
      },
      error: (err) => {
        console.error('[OrdersComponent] Error en estado de conexión:', err);
        this.errorMessage.set('Error al monitorear conexión');
      }
    });
  }
  
  private connectToEventStream(): void {
    try {
      this.orderEventsService.connect();
      this.isLoading.set(false);
      this.lastUpdate.set(new Date());
    } catch (error) {
      this.isLoading.set(false);
      this.errorMessage.set('No se pudo conectar al stream de eventos');
      console.error('[OrdersComponent] Error al conectar:', error);
    }
  }
  
  refreshOrders(): void {
    this.isLoading.set(true);
    this.orderEventsService.disconnect();
    setTimeout(() => {
      this.connectToEventStream();
    }, 500);
  }
  
  clearError(): void {
    this.errorMessage.set(null);
  }
  
  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      pending: '#ff9800',
      processing: '#2196f3',
      completed: '#4caf50',
      cancelled: '#f44336'
    };
    return colors[status] || '#9e9e9e';
  }
  
  trackByOrderId(index: number, order: Order): string {
    return order.id;
  }
}

// === ARCHIVO: client/src/app/features/orders/orders.component.html ===
<div class="orders-container">
  <header class="orders-header">
    <h1>Seguimiento de Órdenes</h1>
    <div class="connection-status" [class.connected]="connectionStatus()" [class.disconnected]="!connectionStatus()">
      <span class="status-indicator"></span>
      <span class="status-text">{{ connectionStatus() ? 'Conectado' : 'Desconectado' }}</span>
    </div>
  </header>

  <app-error-message *ngIf="error()" [message]="error()!"></app-error-message>

  <section class="orders-list" *ngIf="orders().length > 0; else noOrders">
    <app-order-card
      *ngFor="let order of orders(); trackBy: trackByOrderId"
      [order]="order">
    </app-order-card>
  </section>

  <ng-template #noOrders>
    <div class="empty-state">
      <mat-icon class="empty-icon">inbox</mat-icon>
      <p class="empty-message">No hay órdenes disponibles</p>
      <p class="empty-hint">Las órdenes aparecerán aquí cuando se generen eventos</p>
    </div>
  </ng-template>

  <div class="actions-bar" *ngIf="orders().length > 0">
    <button mat-raised-button color="primary" (click)="clearOrders()">
      <mat-icon>clear_all</mat-icon>
      Limpiar Órdenes
    </button>
  </div>
</div>

// === ARCHIVO: client/src/app/shared/components/error-message/error-message.component.ts ===
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="error-container" *ngIf="message" role="alert" aria-live="assertive">
      <div class="error-icon">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>
      <div class="error-content">
        <p class="error-text">{{ message }}</p>
        <button 
          *ngIf="dismissible" 
          class="error-dismiss" 
          (click)="dismiss()"
          aria-label="Dismiss error">
          ✕
        </button>
      </div>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      color: #991b1b;
      margin: 16px 0;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .error-icon {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      color: #dc2626;
    }

    .error-icon svg {
      width: 100%;
      height: 100%;
    }

    .error-content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    }

    .error-text {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
      font-weight: 500;
    }

    .error-dismiss {
      flex-shrink: 0;
      background: none;
      border: none;
      color: #991b1b;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 16px;
      line-height: 1;
      transition: background-color 0.2s;
    }

    .error-dismiss:hover {
      background-color: #fecaca;
    }

    .error-dismiss:focus {
      outline: 2px solid #dc2626;
      outline-offset: 2px;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() message: string = '';
  @Input() dismissible: boolean = false;

  dismiss(): void {
    this.message = '';
  }
}

// === ARCHIVO: client/src/app/features/orders/orders.component.spec.ts ===
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
import { OrderEventsService } from '@app/core/services/order-events.service';
import { Signal } from '@angular/core';
import { OrderEvent } from '@app/core/models/order-event.model';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let orderEventsServiceMock: jasmine.SpyObj<OrderEventsService>;
  let mockEvents: OrderEvent[];

  beforeEach(async () => {
    mockEvents = [
      {
        id: 'evt-1',
        orderId: 'ORD-001',
        type: 'CREATED',
        timestamp: new Date('2024-01-15T10:00:00Z').toISOString(),
        data: { customer: 'John Doe', total: 150.00 }
      },
      {
        id: 'evt-2',
        orderId: 'ORD-002',
        type: 'UPDATED',
        timestamp: new Date('2024-01-15T11:00:00Z').toISOString(),
        data: { status: 'shipped' }
      },
      {
        id: 'evt-3',
        orderId: 'ORD-001',
        type: 'DELETED',
        timestamp: new Date('2024-01-15T12:00:00Z').toISOString(),
        data: { reason: 'Customer request' }
      }
    ];

    orderEventsServiceMock = jasmine.createSpyObj('OrderEventsService', [
      'connect',
      'disconnect',
      'getConnectionStatus'
    ]);

    orderEventsServiceMock.connect.and.returnValue(undefined);
    orderEventsServiceMock.disconnect.and.returnValue(undefined);
    orderEventsServiceMock.getConnectionStatus.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [OrdersComponent],
      providers: [
        { provide: OrderEventsService, useValue: orderEventsServiceMock },
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call connect on initialization', () => {
    expect(orderEventsServiceMock.connect).toHaveBeenCalled();
  });

  it('should call disconnect on destruction', () => {
    fixture.destroy();
    expect(orderEventsServiceMock.disconnect).toHaveBeenCalled();
  });

  it('should display loading state initially', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const loadingElement = compiled.querySelector('.loading-state');
    expect(loadingElement).toBeTruthy();
  });

  it('should display events when loaded', fakeAsync(() => {
    const eventsSignal = (component as any).events;
    eventsSignal.set([...mockEvents]);
    fixture.detectChanges();
    tick();

    const compiled = fixture.nativeElement as HTMLElement;
    const eventCards = compiled.querySelectorAll('app-order-card');
    expect(eventCards.length).toBe(3);
  }));

  it('should display empty state when no events', () => {
    const eventsSignal = (component as any).events;
    eventsSignal.set([]);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const emptyState = compiled.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
  });

  it('should display error message when error signal is set', () => {
    const errorSignal = (component as any).errorMessage;
    errorSignal.set('Connection failed to event stream');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorComponent = compiled.querySelector('app-error-message');
    expect(errorComponent).toBeTruthy();
  });

  it('should not display error message when error signal is empty', () => {
    const errorSignal = (component as any).errorMessage;
    errorSignal.set('');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorComponent = compiled.querySelector('app-error-message');
    expect(errorComponent).toBeFalsy();
  });

  it('should update connection status indicator', fakeAsync(() => {
    const connectionStatusSignal = (component as any).isConnected;
    connectionStatusSignal.set(true);
    fixture.detectChanges();
    tick();

    const compiled = fixture.nativeElement as HTMLElement;
    const connectedIndicator = compiled.querySelector('.connection-status.connected');
    expect(connectedIndicator).toBeTruthy();
  }));

  it('should show disconnected status when connection is lost', fakeAsync(() => {
    const connectionStatusSignal = (component as any).isConnected;
    connectionStatusSignal.set(false);
    fixture.detectChanges();
    tick();

    const compiled = fixture.nativeElement as HTMLElement;
    const disconnectedIndicator = compiled.querySelector('.connection-status.disconnected');
    expect(disconnectedIndicator).toBeTruthy();
  }));

  it('should sort events by timestamp descending', fakeAsync(() => {
    const unsortedEvents: OrderEvent[] = [
      {
        id: 'evt-newest',
        orderId: 'ORD-003',
        type: 'CREATED',
        timestamp: new Date('2024-01-15T14:00:00Z').toISOString(),
        data: {}
      },
      {
        id: 'evt-oldest',
        orderId: 'ORD-001',
        type: 'CREATED',
        timestamp: new Date('2024-01-15T08:00:00Z').toISOString(),
        data: {}
      }
    ];

    const eventsSignal = (component as any).events;
    eventsSignal.set(unsortedEvents);
    fixture.detectChanges();
    tick();

    const eventCards = fixture.nativeElement.querySelectorAll('app-order-card');
    expect(eventCards.length).toBe(2);
  }));

  it('should handle reconnection attempt', fakeAsync(() => {
    orderEventsServiceMock.connect.calls.reset();
    component.reconnect();
    tick();
    expect(orderEventsServiceMock.connect).toHaveBeenCalled();
  }));

  describe('Event processing', () => {
    it('should filter events by type when filter is active', fakeAsync(() => {
      const eventsSignal = (component as any).events;
      eventsSignal.set([...mockEvents]);

      const filterSignal = (component as any).typeFilter;
      filterSignal.set('CREATED');
      fixture.detectChanges();
      tick();

      const compiled = fixture.nativeElement as HTMLElement;
      const eventCards = compiled.querySelectorAll('app-order-card');
      expect(eventCards.length).toBe(1);
    }));

    it('should show all events when no filter is active', fakeAsync(() => {
      const eventsSignal = (component as any).events;
      eventsSignal.set([...mockEvents]);

      const filterSignal = (component as any).typeFilter;
      filterSignal.set(null);
      fixture.detectChanges();
      tick();

      const compiled = fixture.nativeElement as HTMLElement;
      const eventCards = compiled.querySelectorAll('app-order-card');
      expect(eventCards.length).toBe(3);
    }));
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels on connection status', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const statusElement = compiled.querySelector('.connection-status');
      expect(statusElement?.getAttribute('aria-label')).toBeTruthy();
    });

    it('should have proper heading structure', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const h1 = compiled.querySelector('h1');
      expect(h1).toBeTruthy();
      expect(h1?.textContent).toContain('Orders');
    });
  });

  describe('Edge cases', () => {
    it('should handle null events gracefully', fakeAsync(() => {
      const eventsSignal = (component as any).events;
      eventsSignal.set(null as any);
      fixture.detectChanges();
      tick();

      const compiled = fixture.nativeElement as HTMLElement;
      const emptyState = compiled.querySelector('.empty-state');
      expect(emptyState).toBeTruthy();
    }));

    it('should handle malformed event data', fakeAsync(() => {
      const malformedEvents: OrderEvent[] = [
        {
          id: 'evt-malformed',
          orderId: '',
          type: 'CREATED' as any,
          timestamp: 'invalid-date',
          data: {}
        }
      ];

      const eventsSignal = (component as any).events;
      eventsSignal.set(malformedEvents);
      fixture.detectChanges();
      tick();

      expect(component).toBeTruthy();
    }));
  });
});

// === ARCHIVO: client/src/app/core/models/order-event.model.ts ===
export interface OrderEvent {
  id: string;
  orderId: string;
  type: 'CREATED' | 'UPDATED' | 'DELETED';
  timestamp: string;
  data: Record<string, unknown>;
}

// === ARCHIVO: client/src/environments/environment.ts ===
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};

// === ARCHIVO: client/src/app/app.routes.ts ===
import { Routes } from '@angular/router';

export const routes: Routes = [];

// === ARCHIVO: client/src/app/shared/components/order-card/order-card.component.ts ===
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Order, OrderEvent } from '../../../features/orders/orders.component';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="order-card" [class.expanded]="expanded">
      <mat-card-header>
        <mat-card-title>{{ order.id }}</mat-card-title>
        <mat-card-subtitle>{{ order.customerName }}</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <div class="order-details">
          <div class="detail-row">
            <span class="label">Estado:</span>
            <mat-chip [style.background-color]="getStatusColor(order.status)" class="status-chip">
              {{ order.status }}
            </mat-chip>
          </div>
          
          <div class="detail-row">
            <span class="label">Total:</span>
            <span class="amount">{{ order.totalAmount | currency }}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Items:</span>
            <span>{{ order.items }}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Creado:</span>
            <span>{{ order.createdAt | date:'short' }}</span>
          </div>
          
          <div class="detail-row" *ngIf="order.updatedAt">
            <span class="label">Actualizado:</span>
            <span>{{ order.updatedAt | date:'short' }}</span>
          </div>
        </div>
      </mat-card-content>
      
      <mat-card-actions align="end">
        <button mat-button 
                (click)="onViewDetails()"
                matTooltip="Ver detalles completos">
          <mat-icon>visibility</mat-icon>
          Ver
        </button>
        <button mat-button 
                color="primary"
                (click)="onEdit()"
                [disabled]="order.status === 'completed' || order.status === 'cancelled'">
          <mat-icon>edit</mat-icon>
          Editar
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .order-card {
      margin-bottom: 16px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .order-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .order-card.expanded {
      border-left: 4px solid #2196f3;
    }
    
    .order-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px 0;
    }
    
    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .label {
      font-weight: 500;
      color: #666;
    }
    
    .amount {
      font-weight: bold;
      color: #2e7d32;
      font-size: 1.1em;
    }
    
    .status-chip {
      color: white !important;
      font-weight: 500;
    }
    
    mat-card-actions {
      padding: 8px 16px;
    }
  `]
})
export class OrderCardComponent {
  @Input() order!: Order;
  @Input() expanded = false;
  @Output() viewDetails = new EventEmitter<Order>();
  @Output() edit = new EventEmitter<Order>();

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      pending: '#ff9800',
      processing: '#2196f3',
      completed: '#4caf50',
      cancelled: '#f44336'
    };
    return colors[status] || '#9e9e9e';
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.order);
  }

  onEdit(): void {
    this.edit.emit(this.order);
  }
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  kafka:
    image: "apache/kafka:3.8.0"
    ports:
      - "127.0.0.1:9092:9092"
    environment:
      KAFKA_NODE_ID: "1"
      KAFKA_PROCESS_ROLES: "broker,controller"
      KAFKA_LISTENERS: "PLAINTEXT://:9092,CONTROLLER://:9093"
      KAFKA_ADVERTISED_LISTENERS: "PLAINTEXT://localhost:9092"
      KAFKA_CONTROLLER_LISTENER_NAMES: "CONTROLLER"
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: "CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT"
      KAFKA_CONTROLLER_QUORUM_VOTERS: "1@localhost:9093"
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: "1"
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: "1"
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: "1"
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: "0"
    healthcheck:
      test: ["CMD-SHELL","/opt/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server localhost:9092 > /dev/null 2>&1"]
      interval: 15s
      timeout: 10s
      retries: 10
      start_period: 30s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| Apache Kafka (KRaft, un nodo) | `apache/kafka:3.8.0` | 9092 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/kafka/create-topics.sh ===
#!/usr/bin/env bash
# Crea los topics en Kafka local (idempotente). Ejecutar con el compose levantado y healthy.
set -euo pipefail

docker compose exec -T kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --if-not-exists --topic app-events --partitions 1 --replication-factor 1

```

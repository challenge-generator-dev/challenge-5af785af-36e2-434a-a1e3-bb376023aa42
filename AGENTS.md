# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de visualización en tiempo real de órdenes**.

| | |
|---|---|
| Tema | Consumo de eventos en tiempo real con Kafka |
| Nivel | advanced-l2 |
| Chapter | Frontend |
| Especialidad | Angular |
| Stack | TypeScript / Angular 20 |
| Patron arquitectonico | patrón contenedor/presentacional con Signals |
| Tiempo estimado | 8 horas |

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

## Receta del stack

Esqueleto obligatorio:

- `package.json, angular.json y tsconfig.json en la raiz`
- `src/main.ts con bootstrapApplication`
- `src/app/app.config.ts con los providers`
- `src/app/core con servicios y modelos`
- `src/app/features con componentes contenedores`
- `src/app/shared con componentes presentacionales`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET y el proyecto no instala. Usa rango con caret sobre una version que exista.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.
- Angular necesita `angular.json` y `tsconfig.json` ademas del `package.json`, o `ng build` no corre.

Dependencias:

- @angular/core 20.0.0
- @angular/common 20.0.0
- @angular/compiler 20.0.0
- @angular/platform-browser 20.0.0
- @angular/platform-browser-dynamic 20.0.0
- @angular/router 20.0.0
- @angular/forms 20.0.0
- @angular/material 18.0.0
- rxjs 7.8.1
- @angular-eslint/eslint-plugin 18.0.0
- jest-preset-angular 14.0.0
- jest 29.7.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración inicial del consumidor de Kafka**: Consumidor de Kafka configurado y probado, capaz de mostrar mensajes de eventos en la interfaz.
- **Fase 2 — Procesamiento y visualización de eventos**: Interfaz de usuario actualizada que muestra los eventos de órdenes en tiempo real.
- **Fase 3 — Optimización y pruebas**: Sistema optimizado y documentado, con pruebas unitarias y de integración realizadas.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `api/src/infrastructure/kafka/kafka-consumer.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- [ ] `api/src/application/order-events.service.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

## Lo que falta y tenes que completar

### 1. Archivos que la arquitectura declara (1 de 28)

La propuesta arquitectonica del reto los lista y no llegaron al repo. Crealos con implementacion real, respetando la capa en la que viven:

- [ ] `client/src/app/features/orders/orders.component.scss`

### 2. Referencias colgando (8)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `api/src/infrastructure/kafka/kafka-consumer.service.spec.ts` — `KafkaConsumerService.connect`
      Se invoca `connect` sobre `KafkaConsumerService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `api/src/infrastructure/kafka/kafka-consumer.service.spec.ts` — `KafkaConsumerService.subscribeToTopic`
      Se invoca `subscribeToTopic` sobre `KafkaConsumerService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `api/src/infrastructure/kafka/kafka-consumer.service.spec.ts` — `KafkaConsumerService.consumeMessages`
      Se invoca `consumeMessages` sobre `KafkaConsumerService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `api/package.json` — `@nestjs/event-emitter@11.0.0`
      @nestjs/event-emitter declara la version exacta 11.0.0, que no esta publicada: `npm install` falla con ETARGET. Reemplazala por una version publicada real.
- [ ] `client/src/app/core/services/order-events.service.spec.ts` — `OrderEventsService.orders`
      Se invoca `orders` sobre `OrderEventsService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/core/services/order-events.service.spec.ts` — `OrderEventsService.error`
      Se invoca `error` sobre `OrderEventsService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/core/services/order-events.service.spec.ts` — `OrderEventsService.isConnected`
      Se invoca `isConnected` sobre `OrderEventsService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/features/orders/orders.component.spec.ts` — `OrdersComponent.reconnect`
      Se invoca `reconnect` sobre `OrdersComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (35)

- `api/package.json`
- `api/tsconfig.json`
- `api/src/main.ts`
- `api/src/domain/order.entity.ts`
- `api/src/domain/order-events.port.ts`
- `api/src/app.module.ts`
- `api/src/application/order-events.service.ts`
- `api/src/application/order-events.service.spec.ts`
- `api/src/infrastructure/kafka/kafka.module.ts`
- `api/src/infrastructure/kafka/kafka-consumer.service.ts`
- `api/src/infrastructure/controllers/order-events.controller.ts`
- `api/src/config/kafka.config.ts`
- `api/src/common/exceptions/global-exception.filter.ts`
- `api/src/infrastructure/kafka/kafka-consumer.service.spec.ts`
- `api/test/jest-e2e.json`
- `client/package.json`
- `client/angular.json`
- `client/tsconfig.json`
- `client/src/app/core/services/order-events.service.ts`
- `client/src/app/core/services/order-events.service.spec.ts`
- `client/src/main.ts`
- `client/src/index.html`
- `client/src/app/app.config.ts`
- `client/src/app/app.component.ts`
- `client/src/app/features/orders/orders.component.ts`
- `client/src/app/features/orders/orders.component.html`
- `client/src/app/shared/components/error-message/error-message.component.ts`
- `client/src/app/features/orders/orders.component.spec.ts`
- `client/src/app/core/models/order-event.model.ts`
- `client/src/environments/environment.ts`
- `client/src/app/app.routes.ts`
- `client/src/app/shared/components/order-card/order-card.component.ts`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/kafka/create-topics.sh`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `api`
- `api/src/domain`
- `api/src/application`
- `api/src/infrastructure`
- `api/src/config`
- `api/src/common`
- `client`
- `client/src/app/core`
- `client/src/app/features/orders`
- `client/src/app/shared`
- `client/src/app/services`

## Verificacion

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **patrón contenedor/presentacional con Signals**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Advanced L2
- Brecha que el reto ataca: Publicar y consumir eventos en un topic Kafka y mostrarlos en tiempo real (corrida e2e 20261109184921254), Publica y consume eventos de un topic Kafka y refleja los mensajes en la interfaz
- Mision: Mostrar en vivo el estado de las ordenes

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*

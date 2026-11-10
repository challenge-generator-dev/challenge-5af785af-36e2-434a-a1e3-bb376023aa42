# Implementación de visualización en tiempo real de órdenes

El sistema de seguimiento de órdenes debe publicar y consumir eventos en un topic de Kafka, mostrando los cambios en tiempo real en la interfaz de usuario. Los eventos incluyen la creación, actualización y eliminación de órdenes. El sistema debe manejar correctamente los errores de conexión con Kafka y mostrar un mensaje de error en la interfaz cuando ocurra un fallo.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Consumo de eventos en tiempo real con Kafka |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración inicial del consumidor de Kafka

**Objetivo:** Configurar y probar la conexión con el topic de Kafka para consumir eventos.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configura el consumidor de Kafka para que se conecte al topic de órdenes.
- Implementa un manejador de eventos que procese los mensajes recibidos.
- Maneja los errores de conexión con Kafka mostrando un mensaje de error en la interfaz.

**Entregable:** Consumidor de Kafka configurado y probado, capaz de mostrar mensajes de eventos en la interfaz.

<details>
<summary>Pistas de conocimiento</summary>

- Importancia de manejar errores de conexión en sistemas distribuidos.
- Uso de patrones de diseño para desacoplar la lógica de negocio del manejo de eventos.

</details>

### Fase 2: Procesamiento y visualización de eventos

**Objetivo:** Implementar la lógica para procesar y mostrar los eventos de órdenes en la interfaz.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa la lógica para procesar los eventos de creación, actualización y eliminación de órdenes.
- Actualiza la interfaz de usuario para mostrar los cambios en tiempo real.
- Asegura que la interfaz refleje correctamente el estado actual de las órdenes.

**Entregable:** Interfaz de usuario actualizada que muestra los eventos de órdenes en tiempo real.

<details>
<summary>Pistas de conocimiento</summary>

- Importancia de mantener la interfaz de usuario sincronizada con el estado del sistema.
- Uso de componentes reutilizables para mostrar información en la interfaz.

</details>

### Fase 3: Optimización y pruebas

**Objetivo:** Optimizar el rendimiento y realizar pruebas exhaustivas del sistema.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Optimiza el rendimiento del consumidor de Kafka y la actualización de la interfaz.
- Realiza pruebas unitarias y de integración para asegurar la correcta funcionalidad del sistema.
- Documenta el proceso de configuración y uso del consumidor de Kafka.

**Entregable:** Sistema optimizado y documentado, con pruebas unitarias y de integración realizadas.

<details>
<summary>Pistas de conocimiento</summary>

- Técnicas de optimización de rendimiento en sistemas de eventos en tiempo real.
- Importancia de la documentación para facilitar el mantenimiento y la escalabilidad del sistema.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es un consumidor de Kafka y cuál es su función en este sistema?
- **paraQueSirve**: ¿Para qué sirve mostrar los eventos de órdenes en tiempo real en la interfaz?
- **comoSeUsa**: ¿Cómo se usa el consumidor de Kafka para procesar y mostrar los eventos de órdenes?
- **erroresComunes**: ¿Cuáles son los errores comunes al consumir eventos de Kafka y cómo se manejan en este sistema?
- **queDecisionesImplica**: ¿Qué decisiones implica la optimización del rendimiento del sistema y la documentación del proceso?

## Criterios de Evaluacion

- Configuración correcta del consumidor de Kafka.
- Manejo adecuado de errores de conexión con Kafka.
- Implementación de la lógica para procesar y mostrar los eventos de órdenes.
- Sincronización correcta de la interfaz de usuario con el estado del sistema.
- Optimización del rendimiento del sistema.
- Realización de pruebas unitarias y de integración.
- Documentación clara y completa del proceso de configuración y uso del consumidor de Kafka.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*

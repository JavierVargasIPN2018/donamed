# DonaMed - Plataforma de Donación de Medicamentos

Plataforma web para conectar donadores y receptores de medicamentos, facilitando donaciones seguras y trazables.

## 🏗️ Arquitectura

Este proyecto sigue una **arquitectura hexagonal** con separación estricta entre cliente y servidor:

- **Frontend**: Next.js 16 + React 19 + shadcn/ui
- **Backend**: Servicios TypeScript puros (portables)
- **Base de Datos**: PostgreSQL + Drizzle ORM
- **Estrategia**: AgileFlow (trunk-based development)

📚 **Documentación completa**: [ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## 🚀 Quick Start

### Prerrequisitos

- Node.js 20+
- pnpm 8+
- Docker (para PostgreSQL)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JavierVargasIPN2018/donamed.git
cd donamed

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Levantar base de datos
docker-compose up -d

# Generar schemas de base de datos
pnpm run db:push

# Correr en desarrollo
pnpm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo
pnpm build            # Build de producción
pnpm start            # Servidor de producción
pnpm lint             # Ejecutar ESLint

# Base de Datos
pnpm db:generate      # Generar migraciones
pnpm db:migrate       # Ejecutar migraciones
pnpm db:push          # Push schema a DB (dev)
pnpm db:studio        # Abrir Drizzle Studio
```

## 🏛️ Estructura del Proyecto

```
donamed/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── (routes)/     # Grupos de rutas
│   │   └── api/          # API endpoints
│   ├── client/           # Frontend (UI pura)
│   │   ├── components/   # Componentes shadcn/ui
│   │   └── modules/      # Módulos por dominio
│   ├── server/           # Backend (lógica de negocio)
│   │   ├── db/           # Drizzle ORM
│   │   └── modules/      # Servicios por dominio
│   └── shared/           # Tipos compartidos
├── docs/                 # Documentación
│   ├── ARCHITECTURE.md   # Arquitectura del sistema
│   └── adr/              # Decisiones arquitectónicas
└── .github/              # CI/CD y templates
```

## 🎯 Módulos Funcionales

| Módulo | Descripción | Estado |
|--------|-------------|--------|
| **Identity** | Autenticación y perfiles | 🚧 En desarrollo |
| **Inventory** | Catálogo de medicamentos | 📋 Planeado |
| **Matchmaking** | Solicitudes y matching | 📋 Planeado |
| **Coordination** | Chat y logística | 📋 Planeado |
| **Resolution** | Evidencia y firmas | 📋 Planeado |
| **Governance** | Panel administrativo | 📋 Planeado |

## 🤝 Contribuir

Lee nuestra [Guía de Contribución](./CONTRIBUTING.md) para conocer:

- Estrategia de branching (AgileFlow)
- Convenciones de commits (Conventional Commits)
- Workflow de Pull Requests
- Asignación de trabajo por rol

### Conventional Commits

```bash
# Formato
tipo(scope): descripción

# Ejemplos
git commit -m "feat(identity): add user registration"
git commit -m "fix(inventory): correct validation"
git commit -m "docs(readme): update setup instructions"
```

## 🧪 Testing

```bash
# Próximamente
pnpm test              # Ejecutar tests
pnpm test:watch        # Tests en modo watch
pnpm test:coverage     # Reporte de cobertura
```

## 📚 Recursos

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Arquitectura del sistema
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guía de contribución
- [ANALISIS_PROYECTO.md](./docs/ANALISIS_PROYECTO.md) - Análisis completo
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [shadcn/ui](https://ui.shadcn.com/)

## 👥 Equipo

- 1 Backend Developer
- 1 Frontend Developer
- 1 Fullstack Developer

## 📄 Licencia

[Especificar licencia]

---

**Desarrollado con ❤️ por el equipo de DonaMed**

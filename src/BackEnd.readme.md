
# 🛒 Backend API - Proyecto Tienda

Backend desarrollado con **NestJS** y **TypeScript** para una aplicación de tienda online. Proporciona una API REST completa para la gestión de productos, autenticación de usuarios y subida de archivos.

## 🚀 Características

- **Autenticación JWT** con roles de usuario
- **CRUD completo de productos** con imágenes
- **Base de datos PostgreSQL** con TypeORM
- **Subida de archivos** e imágenes
- **Validación de datos** con class-validator
- **Paginación** de resultados
- **CORS configurado** para múltiples orígenes
- **Dockerizado** con Docker Compose

## 🛠️ Tecnologías Utilizadas

- **NestJS** - Framework de Node.js
- **TypeScript** - Lenguaje de programación
- **PostgreSQL** - Base de datos
- **TypeORM** - ORM para base de datos
- **JWT** - Autenticación
- **Passport** - Estrategias de autenticación
- **Bcrypt** - Encriptación de contraseñas
- **Class Validator** - Validación de DTOs
- **Multer** - Subida de archivos
- **Docker** - Contenedorización

## 📋 Prerequisitos

- Node.js (v16 o superior)
- Docker y Docker Compose
- NPM o Yarn

## ⚙️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd proyecto-tienda01BackEnd
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   # Base de datos
   DB_PASSWORD=miPassword123
   DB_NAME=tienda02DB
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   
   # JWT
   JWT_SECRET=tuClaveSecretaJWT
   
   # Puerto de la aplicación
   PORT=3000
   ```

4. **Iniciar la base de datos con Docker**
   ```bash
   docker-compose up -d
   ```

5. **Ejecutar la aplicación**
   ```bash
   # Desarrollo
   npm run start:dev
   
   # Producción
   npm run start:prod
   ```

## 🔗 Endpoints de la API

La API se encuentra disponible en: `http://localhost:3000/api`

### 🔐 Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/auth/registro` | Registrar nuevo usuario | ❌ |
| POST | `/auth/login` | Iniciar sesión | ❌ |
| GET | `/auth/check-status` | Verificar estado de autenticación | ✅ |
| GET | `/auth/Panel-Administrador` | Panel de administrador | ✅ (Admin) |

#### Registro de Usuario
```json
POST /api/auth/registro
{
  "email": "usuario@ejemplo.com",
  "password": "password123",
  "fullName": "Nombre Completo"
}
```

#### Iniciar Sesión
```json
POST /api/auth/login
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

### 📦 Productos (`/api/productos`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/productos` | Obtener todos los productos (paginado) | ❌ |
| GET | `/productos/:term` | Obtener producto por ID/slug/título | ❌ |
| POST | `/productos` | Crear nuevo producto | ✅ (Admin) |
| PATCH | `/productos/:id` | Actualizar producto | ✅ (Admin) |
| DELETE | `/productos/:id` | Eliminar producto | ✅ (Admin) |

#### Crear Producto
```json
POST /api/productos
Authorization: Bearer [JWT_TOKEN]
{
  "titulo": "Producto Ejemplo",
  "precio": 99.99,
  "descripcion": "Descripción del producto",
  "slug": "producto-ejemplo",
  "stock": 10,
  "sizes": ["S", "M", "L"],
  "gender": "unisex",
  "tags": ["tag1", "tag2"],
  "imagenes": ["imagen1.jpg", "imagen2.jpg"]
}
```

#### Paginación
```
GET /api/productos?limit=10&offset=0
```

## 🏗️ Estructura del Proyecto

```
src/
├── auth/                    # Módulo de autenticación
│   ├── decorators/          # Decoradores personalizados
│   ├── dto/                 # DTOs de autenticación
│   ├── entities/            # Entidad User
│   ├── guards/              # Guards de autenticación
│   ├── interfaces/          # Interfaces y roles
│   ├── strategies/          # Estrategias de Passport
│   ├── auth.controller.ts   # Controlador de auth
│   ├── auth.service.ts      # Servicio de auth
│   └── auth.module.ts       # Módulo de auth
├── productos/               # Módulo de productos
│   ├── dto/                 # DTOs de productos
│   ├── entities/            # Entidades Producto y ProductoImg
│   ├── productos.controller.ts
│   ├── productos.service.ts
│   └── productos.module.ts
├── files/                   # Módulo de archivos
├── common/                  # Módulo común (DTOs compartidos)
├── app.module.ts           # Módulo principal
└── main.ts                 # Punto de entrada
```

## 🔒 Autenticación y Autorización

### Roles de Usuario
- **user**: Usuario normal (lectura)
- **admin**: Administrador (CRUD completo)

### Headers de Autenticación
```
Authorization: Bearer [JWT_TOKEN]
```

### Token JWT
El token incluye:
- `id`: ID del usuario
- `email`: Correo electrónico
- `roles`: Array de roles del usuario
- `iat`: Fecha de emisión
- `exp`: Fecha de expiración (4 horas)

## 🗄️ Base de Datos

### Entidades Principales

#### Usuario (users)
```sql
- id (UUID, PK)
- email (TEXT, UNIQUE)
- password (TEXT)
- fullName (TEXT)
- isActive (BOOLEAN)
- roles (TEXT[])
```

#### Producto (producto)
```sql
- id (UUID, PK)
- titulo (TEXT, UNIQUE)
- precio (FLOAT)
- descripcion (TEXT)
- slug (TEXT, UNIQUE)
- stock (INT)
- sizes (TEXT[])
- gender (TEXT)
- tags (TEXT[])
- user_id (UUID, FK)
```

#### Imágenes de Producto (producto_img)
```sql
- id (UUID, PK)
- url (TEXT)
- producto_id (UUID, FK)
```

## 🐋 Docker

### Configuración de Base de Datos
```yaml
services:
  db:
    image: postgres:14.3
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: ${DB_password}
      POSTGRES_DB: ${DB_name}
    container_name: tienda02DB
    volumes:
      - ./data:/var/lib/postgresql/data
```

### Comandos Docker
```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

## 🚦 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev          # Modo desarrollo con hot reload
npm run start:debug        # Modo debug

# Producción
npm run build              # Compilar proyecto
npm run start:prod         # Ejecutar en producción

# Testing
npm run test               # Ejecutar tests
npm run test:watch         # Tests en modo watch
npm run test:e2e           # Tests end-to-end

# Calidad de código
npm run lint               # Ejecutar ESLint
npm run format             # Formatear código con Prettier
```

## 🌐 CORS

El backend está configurado para aceptar peticiones desde:
- `http://localhost:5173` (desarrollo local)
- `https://fahaadtienda01.netlify.app` (producción)

## 📁 Archivos Estáticos

Los archivos subidos se sirven desde:
- Directorio: `/static`
- URL: `http://localhost:3000/static/productos-img/[filename]`

## 🔧 Configuración Adicional

### Validación Global
- **Whitelist**: Solo acepta propiedades definidas en DTOs
- **ForbidNonWhitelisted**: Rechaza propiedades no permitidas

### TypeORM
- **Synchronize**: Habilitado (solo desarrollo)
- **AutoLoadEntities**: Habilitado
- **Entities**: Carga automática desde `**/*.entity.{ts,js}`

## 🐛 Solución de Problemas

### Error de conexión a la base de datos
1. Verificar que Docker esté ejecutándose
2. Comprobar las variables de entorno
3. Asegurar que el puerto 5432 esté disponible

### Error de autenticación
1. Verificar que el JWT_SECRET esté configurado
2. Comprobar que el token no haya expirado
3. Verificar los headers de autorización

### Error de CORS
1. Verificar que el origen esté en la lista permitida
2. Comprobar la configuración de CORS en `main.ts`

## 📝 Notas Adicionales

- Los archivos de base de datos se almacenan en el directorio `./data`
- Las imágenes se almacenan en `./static/productos-img`
- Los logs de la aplicación se muestran en consola
- El proyecto usa TypeScript estricto
- La validación de datos es automática con class-validator

## 👥 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es privado y no tiene licencia pública.

7.LEVANTAR  ```npm run start:dev```




para instalar el docker es ( docker-compose up)

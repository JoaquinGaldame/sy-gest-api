# Sistema de Gestión de Negocio — API

API central para autenticación, usuarios, estructura organizacional y catálogos maestros. Diseñada para integrarse con aplicaciones web y móviles, garantizando seguridad, trazabilidad básica y reglas de visibilidad por rol.

## Alcance Funcional
- Autenticación y sesiones con tokens.
- Gestión de usuarios y perfiles.
- Grupos de usuarios y control de acceso por zona/sucursal.
- Estructura organizacional: compañías, zonas, sucursales, depósitos.
- Catálogos maestros: países, monedas, departamentos, cargos y tipos de cambio.

## Reglas de Negocio (Visibilidad)
- `super_user = true`: acceso total.
- Grupo sin `zone_id` ni `branch_id`: acceso total.
- Grupo con `branch_id`: ve depósitos de esa sucursal.
- Grupo con `zone_id`: ve depósitos de sucursales en esa zona.

## Seguridad
- Tokens de acceso y refresh con rotación.
- Control de acceso por guardias de autenticación.

## Estado del Servicio
- `GET /health`: estado general.
- `GET /ready`: disponibilidad de base de datos.

## Cómo Probar al Clonar
1. Configurar variables de entorno desde el archivo de ejemplo.
2. Preparar la base de datos PostgreSQL y cargar el esquema inicial.
3. (Opcional) Cargar datos de seed para pruebas.
4. Levantar la API y probar el login.



## Soporte Técnico
Este repositorio incluye scripts y utilidades internas para desarrollo. Si necesitás el detalle técnico o guías extendidas de instalación, se mantienen en documentación interna del equipo.

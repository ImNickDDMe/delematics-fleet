import { z } from '@hono/zod-openapi';
import { validateID } from '$utils';

export default z.object({
    id: z
        .string()
        .refine((value) => validateID(value, 'vhcl'))
        .openapi({
            param: {
                name: 'id',
                in: 'query'
            },
            example: 'vhcl_nweqthzg7ndzxl102wgxij46'
        }),
    latitude: z
        .string()
        .openapi({
            param: {
                name: 'latitude',
                in: 'query'
            },
            example: '38.8951'
        }),
    longitude: z
        .string()
        .openapi({
            param: {
                name: 'longitude',
                in: 'query'
            },
            example: '-77.0364'
        }),
    departureMin: z
        .number()
        .int()
        .max(2)
        .openapi({
            param: {
                name: 'departureMin',
                in: 'query'
            },
            example: 10
        }),
    departureSec: z
        .number()
        .int()
        .max(2)
        .openapi({
            param: {
                name: 'departureSec',
                in: 'query'
            },
            example: 5
        }),
    routeName: z
        .string()
        .max(30)
        .openapi({
            param: {
                name: 'routeName',
                in: 'query'
            },
            example: 'Center/Downtown'
        }),
    routeLine: z
        .string()
        .max(3)
        .openapi({
            param: {
                name: 'routeLine',
                in: 'query'
            },
            example: '302'
        }),
    routeColor: z
        .string()
        .max(7)
        .refine((value) => value.startsWith('#'))
        .openapi({
            param: {
                name: 'routeColor',
                in: 'query'
            },
            example: '#020ffa'
        })
}).openapi('Vehicle');
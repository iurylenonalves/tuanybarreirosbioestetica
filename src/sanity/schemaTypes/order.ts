import { defineField, defineType } from 'sanity'

export const order = defineType({
  name: 'order',
  title: 'Pedidos',
  type: 'document',
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Número do Pedido',
      type: 'string',
    }),
    defineField({
      name: 'mercadoPagoId',
      title: 'ID Mercado Pago',
      type: 'string',
    }),
    defineField({
      name: 'customerName',
      title: 'Nome do Cliente',
      type: 'string',
    }),
    defineField({
      name: 'customerEmail',
      title: 'Email do Cliente',
      type: 'string',
    }),
    defineField({
      name: 'customerPhone',
      title: 'Telefone do Cliente',
      type: 'string',
    }),
    defineField({
      name: 'customerAddress',
      title: 'Endereço Completo',
      type: 'string',
    }),
    defineField({
      name: 'customerCity',
      title: 'Cidade',
      type: 'string',
    }),
    defineField({
      name: 'customerState',
      title: 'Estado',
      type: 'string',
    }),
    defineField({
      name: 'customerZipCode',
      title: 'CEP',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Itens',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Nome do Produto' },
            { name: 'quantity', type: 'number', title: 'Quantidade' },
            { name: 'price', type: 'number', title: 'Preço Unitário' },
            { name: 'productId', type: 'string', title: 'ID do Produto' },
          ],
        },
      ],
    }),
    defineField({
      name: 'total',
      title: 'Total',
      type: 'number',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pendente', value: 'pending' },
          { title: 'Aprovado', value: 'approved' },
          { title: 'Rejeitado', value: 'rejected' },
          { title: 'Cancelado', value: 'cancelled' },
          { title: 'Em Trânsito', value: 'in_transit' },
          { title: 'Entregue', value: 'delivered' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'createdAt',
      title: 'Data de Criação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'orderNumber',
      subtitle: 'customerName',
      status: 'status',
    },
    prepare(selection) {
      const { title, subtitle, status } = selection
      return {
        title: `Pedido #${title}`,
        subtitle: `${subtitle} - ${status}`,
      }
    },
  },
})

export function generateWhatsAppLink(order: any[]) {
  let message = "Hola Retro Reeves 🔥%0A%0AQuiero hacer este pedido:%0A"

  order.forEach(item => {
    message += `%0A• ${item.name}%0ATalla: ${item.size}%0AColor: ${item.color}%0ACantidad: ${item.qty}%0A`
  })

  return `https://wa.me/5217773019146?text=${message}`
}

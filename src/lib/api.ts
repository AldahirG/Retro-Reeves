const API = import.meta.env.PUBLIC_API_URL ?? 'http://localhost:3000'

export async function createOrder(payload: {
  guestName:       string
  guestPhone:      string
  guestEmail?:     string
  shippingAddress?: Record<string, string>
  items: {
    productId:   string
    variantId:   string
    productName: string
    size:        string
    color?:      string
    qty:         number
    unitPrice:   string
  }[]
  discountCode?: string
  notes?:        string
  channel?:      'whatsapp' | 'web' | 'manual'
}) {
  const res = await fetch(`${API}/api/v1/orders`, {
    method:      'POST',
    headers:     { 'Content-Type': 'application/json' },
    credentials: 'include',
    body:        JSON.stringify({ ...payload, channel: payload.channel ?? 'whatsapp' }),
  })
  return res.json()
}

export async function validateDiscount(code: string, subtotal: number) {
  const res = await fetch(`${API}/api/v1/discounts/validate`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ code, subtotal }),
  })
  return res.json()
}

export async function trackOrder(orderNumber: string, phone: string) {
  const res = await fetch(`${API}/api/v1/orders/track/${orderNumber}?phone=${encodeURIComponent(phone)}`)
  return res.json()
}

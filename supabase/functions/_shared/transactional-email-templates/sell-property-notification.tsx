import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  phone?: string
  propertyType?: string
  location?: string
  region?: string
  hectares?: string
  price?: string
  hasWater?: string
  hasElectricity?: string
  hasAccess?: string
  description?: string
}

const Row = ({ k, v }: { k: string; v?: string }) => (
  <>
    <Text style={label}>{k}</Text>
    <Text style={value}>{v || '—'}</Text>
  </>
)

const Email = (p: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Nueva propiedad para publicar</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nueva solicitud de publicación</Heading>
        <Text style={subtitle}>
          Un propietario quiere publicar su campo en franconarettopropiedades.cl
        </Text>
        <Hr style={hr} />
        <Section>
          <Text style={sectionTitle}>Contacto</Text>
          <Row k="Nombre" v={p.name} />
          <Row k="Correo electrónico" v={p.email} />
          <Row k="Teléfono" v={p.phone} />
        </Section>
        <Hr style={hr} />
        <Section>
          <Text style={sectionTitle}>Propiedad</Text>
          <Row k="Tipo de propiedad" v={p.propertyType} />
          <Row k="Ubicación / Comuna" v={p.location} />
          <Row k="Región" v={p.region} />
          <Row k="Hectáreas" v={p.hectares} />
          <Row k="Precio estimado" v={p.price} />
          <Row k="Agua" v={p.hasWater} />
          <Row k="Electricidad" v={p.hasElectricity} />
          <Row k="Acceso / Camino" v={p.hasAccess} />
          <Text style={label}>Descripción</Text>
          <Text style={messageStyle}>{p.description || '—'}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>Franco Naretto Propiedades Agrícolas</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Props) =>
    `Nueva propiedad para publicar — ${d?.name || 'propietario'}`,
  displayName: 'Solicitud de publicación de propiedad',
  to: 'contacto@franconarettopropiedades.cl',
  previewData: {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+56 9 1234 5678',
    propertyType: 'Fundo agrícola',
    location: 'Rengo',
    region: 'VI Región',
    hectares: '25',
    price: 'UF 12.000',
    hasWater: 'Sí, derechos de agua',
    hasElectricity: 'Sí',
    hasAccess: 'Camino pavimentado',
    description: 'Campo con plantación de cerezos en producción.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px', margin: '0 auto' }
const h1 = {
  color: '#3d5a32',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 8px',
  fontFamily: 'Playfair Display, Georgia, serif',
}
const subtitle = { color: '#6b6b6b', fontSize: '14px', margin: '0' }
const sectionTitle = {
  color: '#3d5a32',
  fontSize: '14px',
  fontWeight: '700',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 8px',
}
const label = {
  color: '#6b6b6b',
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '12px 0 2px',
  fontWeight: '600',
}
const value = { color: '#2a2a2a', fontSize: '15px', margin: '0' }
const messageStyle = {
  color: '#2a2a2a',
  fontSize: '15px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
  lineHeight: '1.5',
}
const hr = { borderColor: '#e5e0d5', margin: '24px 0' }
const footer = { color: '#8a8a8a', fontSize: '12px', textAlign: 'center' as const }

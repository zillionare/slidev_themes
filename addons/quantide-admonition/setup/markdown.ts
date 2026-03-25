import MdItAdmon from 'markdown-it-admon'

export default function setup(md: any) {
  md.use(((MdItAdmon as any)?.default || MdItAdmon) as any)
}


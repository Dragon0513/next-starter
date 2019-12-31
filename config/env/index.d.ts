export interface ENV {
  port: string
  domain: string
  host: string
  target?: string
  staticSuffix: string
  exportTarget: string
  service: {
    mian: string
    oss: {
      backet: string
      region: string
    }
  }
  env: string
}

declare const env: ENV

export default env

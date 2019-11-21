import { checkBy, not, fp } from '../theme'

interface Props1 {
  hidden: boolean
}

it('should filter parameter', () => {
  const res = not<Props1, keyof Props1>('hidden')('color: red;')({
    hidden: true
  })
  expect(res).toEqual('')
})

interface Props2 {
  hidden?: boolean
  hover?: boolean
}

it('should filter parameter', () => {
  const res = not<Props2, keyof Props2>('hidden')('color: red;')({})
  expect(res).toEqual('color: red;')
})

it('should filter multiple parameters', () => {
  const res = not<Props2, keyof Props2>('hover', 'hidden')('color: red;')({
    hidden: true
  })
  expect(res).toEqual('')
})

interface Props3 {
  color: string
  hidden?: boolean
}

it('should handle functions', () => {
  const res = not<Props3, keyof Props3>('hidden')(
    props => `color: ${props.color};`
  )({
    color: 'white'
  })
  expect(res).toEqual('color: white;')
})

it('should check props by color', () => {
  const res = checkBy('color', {
    white: '#fff',
    black: '#000'
  })({ color: 'black' })

  expect(res).toEqual('#000')
})

it('should mapping enable function', () => {
  const res = checkBy('color', {
    white: props => props.whiteColor,
    black: props => props.blackColor
  })({ color: 'black', blackColor: '#000' })

  expect(res).toEqual('#000')
})

it('should filter props', () => {
  const res = fp({ a: 'a', b: 'b', c: 'c' }, ['a', 'c'])
  expect(res).toEqual({ b: 'b' })
})

import { checkBy, not, fp } from '../theme'

it('should filter parameter', () => {
  const res = not('hidden')('color: red;')({ hidden: true })
  expect(res).toEqual('')
})

it('should filter parameter', () => {
  const res = not('hidden')('color: red;')({})
  expect(res).toEqual('color: red;')
})

it('should filter multiple parameters', () => {
  const res = not('hover', 'hidden')('color: red;')({ hidden: true })
  expect(res).toEqual('')
})

it('should handle functions', () => {
  const res = not('hidden')(props => `color: ${props.color};`)({
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

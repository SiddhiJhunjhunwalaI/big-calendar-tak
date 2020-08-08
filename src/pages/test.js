const timelist = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00'
]

let timeDisabled = timelist.slice(timelist.indexOf('08:30'), timelist.indexOf('10:30'))

const startTimeDisabled = timelist.slice(timelist.indexOf('08:30'), timelist.indexOf('10:30'))
const endTimeDisabled = timelist.slice(timelist.indexOf('08:30') + 1, timelist.indexOf('10:30') + 1)

// console.log(startTimeDisabled)
// console.log(endTimeDisabled)

const timeAvailable = timelist.filter((k, kdx) => !timeDisabled.includes(k))

const startTime = '11:00'

const x = timeDisabled.find((k) => timelist.indexOf(k) > timelist.indexOf(startTime))

if (x) {
  timeDisabled = [...timeDisabled, ...timelist.slice(timelist.indexOf(x))]
}

// console.log(timeDisabled)
// console.log(timeAvailable)

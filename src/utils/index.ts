enum Days {
  周日 = 0,
  周一 = 1,
  周二 = 2,
  周三 = 3,
  周四 = 4,
  周五 = 5,
  周六 = 6,
}

export function getCurrentDay(day: number) {
  return Days[day];
}

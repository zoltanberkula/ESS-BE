/**
 * @Member regAddress Module
 * @Immutable
 * @Object
 * @description GSO Battery basic information object
 * @note attribute: input registers
 */
const battery_basic_iData = {
  TotalSystemVoltage: 20000,
  TotalSystemCurrent: 20001,
  SystemSOC: 20002,
  MaxVsysCell: 20003,
  MinVsysCell: 20004,
  AvgVsysCell: 20005,
  HighestTempBatCell: 20006,
  LowestTempBatCell: 20007,
  AvgTempBatCell: 20008,
  Notused: 20009,
  Notused: 20010,
  Notused: 20011,
  Notused: 20012,
  SysUnitPressDif: 20013,
  SysUnitTempDif: 20014,
  SysTotalCurrent: 20015,
  HighestSingleClustNum: 20016,
  SerNumSysHighSingleClust: 20017,
  LowestCLusterNum: 20018,
  SerNumSysLowClust: 20019,
  SysHighTClustNum: 20020,
  SerNumLowTClust: 20021,
  SysHighTClustNum: 20022,
  SerNumLowTClust: 20023,
  TotalSysCapacity: 20024,
  SysRemainingCapacity: 20025,
  soh: 20026,
  BatteryFullSign: 20027,
  BatteryEmptyFlag: 20028,
  NumOfClusters: 20029,
};

/**
 * @Member regAddress Module
 * @Immutable
 * @Object
 * @description GSO Battery accident information object
 * @note attribute: input registers
 */
const battery_accident_iData = {
  Notused: 20063,
  TotalChargingVoltageHigh: 20064,
  TotalChargingVoltageLow: 20065,
  SysCharUnitOverV: 20066,
  SysCharUnitUnderV: 20067,
  SysCharPressDifLarge: 20068,
  SysCharTempHigh: 20069,
  SysCharTempLow: 20070,
  SysCharTempDifLarge: 20071,
  SysCharOverCurr: 20072,
  SysTotDischVHigh: 20073,
  SysTotDischVLow: 20074,
  SysDischCellOverV: 20075,
  SysDischCellUnderV: 20076,
  SysDischVDifLarge: 20077,
  SysDischTLow: 20078,
  SysDischTHigh: 20079,
  SysDischTDifLarge: 20080,
  SysDischOverCurr: 20081,
  SysSocLow: 20082,
  SysInsResLow: 20083,
  Notused: 20084,
};

/**
 * @Member regAddress Module
 * @Immutable
 * @Object
 * @description Acrel Power meter information object
 * @note attribute: holding registers
 */
const acrel_cumulated_iData = {
  DcVoltageValue: 0,
  DecimalPointOfVoltage: 1,
  DcCurrentValue: 2,
  DecimalPointOfCurrent: 3,
  BrokenWireDetectionIndication: 4,
  InternalTemperature: 5,
  PowerValue: 8,
  PowerDecimalPoint: 9,
  Reserve1: 10,
  Reserve2: 11,
  TotalPositiveActiveEnergyHighByte: 12,
  TotalPositiveActiveEnergyLowByte: 13,
  TotalReverseActiveEnergyHighByte: 14,
  TotalReverseActiveEnergyLowByte: 15,
  VoltageTransformationRatio: 16,
  PrimaryRatedCurrent: 17,
  SwitchInputAndOutputStatus: 18,
  AlarmStatus: 19,
  CurrentTotalVoltagePercentage: 20,
  DcContentPercentageOfVoltage: 21,
  AcContentPercentageOfVoltage: 22,
  CurrentTotalCurrentPercentage: 23,
  DcContentPercentageOfCurrent: 24,
  AcContentPercentageOfCurrent: 25,
  CurrentTotalPowerPercentage: 26,
  DcContentPercentageOfPower: 27,
  AcContentPercentageOfPower: 28,
  Reserve3: 29,
  DateAndTimeSettings1: 30,
  DateAndTimeSettings2: 31,
  DateAndTimeSettings3: 32,
  CurrentMeterReadingDayHighByte: 33,
  CurrentRateLowByte: 33,
  Reserve4: 34,
  SoftWareVersionNumber: 35,
  TotalPositiveActiveEnergy1: 2000,
  TotalPositiveActiveEnergy2: 2001,
  TotalPositiveActiveEnergySharp1: 2002,
  TotalPositiveActiveEnergySharp2: 2003,
  TotalPositiveActiveEnergyPeak1: 2004,
  TotalPositiveActiveEnergyPeak2: 2005,
  TotalPositiveActiveEnergyShould1: 2006,
  TotalPositiveActiveEnergyShould2: 2007,
  TotalPositiveActiveEnergyOffPeak1: 2008,
  TotalPositiveActiveEnergyOffPeak2: 2009,
  TotalPositiveActiveEnergyForTheCurrentMonth1: 2010,
  TotalPositiveActiveEnergyForTheCurrentMonth2: 2011,
  PositiveActiveEnergyForTheCurrentMonthSharp1: 2012,
  PositiveActiveEnergyForTheCurrentMonthSharp2: 2013,
  PositiveActiveEnergyForTheCurrentMonthPeak1: 2014,
  PositiveActiveEnergyForTheCurrentMonthPeak2: 2015,
  PositiveActiveEnergyForTheCurrentMonthShould1: 2016,
  PositiveActiveEnergyForTheCurrentMonthShould2: 2017,
  PositiveActiveEnergyForTheCurrentMonthOffPeak1: 2018,
  PositiveActiveEnergyForTheCurrentMonthOffPeak2: 2019,
};

/**
 * @Member regAddress Module
 * @Immutable
 * @Object
 * @description Acrel Energy meter measurand object
 * @note attribute: holding registers
 */
const acrel_iData = {
  AcrelDcVoltage: 0,
  AcrelDcCurrent: 2,
  AcrelInternalTemp: 5,
  AcrelPowerValue: 8,
  AcrelTotalPositiveActiveEnergyHighByte: 12,
  AcrelTotalPositiveActiveEnergyLowByte: 13,
  AcrelTotalReverseActiveEnergyHb: 14,
  AcrelTotalReverseActiveEnergyLb: 15,
  AcrelTotalPositiveActiveEnergyHb: 2000,
  AcrelTotalPositiveActiveEnergyLb: 2001,
  TotalPositiveActiveEnergyOffPeak1: 2008,
  TotalPositiveActiveEnergyOffPeak2: 2009,
};

/**
 * @Member regAddress Module
 * @Immutable
 * @Object
 * @description AcrelDual Energy meter measurand object
 * @note attribute: holding registers
 */
const acrelD_iData = {
  AcrelDDcVoltage: 0,
  AcrelDDcCurrent: 2,
  AcrelDInternalTemp: 5,
  AcrelDPowerValue: 8,
  AcrelDualTotalPositiveActiveEnergyHighByte: 12,
  AcrelDualTotalPositiveActiveEnergyLowByte: 13,
  AcrelDualTotalPositiveActiveEnergyHb: 2000,
  AcrelDualTotalPositiveActiveEnergyLb: 2001,
};

/**
 * @Member regAddress Module
 * @Immutable
 * @Object
 * @description Orno AC Energy Meter measurand object
 * @note attribute: holding registers
 */
const orno_iData = {
  OrnoL1Voltage: 0x000e, //4byte 2w
  OrnoL2Voltage: 0x0010, //0x0010, //4byte 2w
  OrnoL3Voltage: 0x0012, //0x0012, //4byte 2w
  OrnoGridFrequency: 0x0014, //4byte 2w
  OrnoL1Current: 0x0016, //4byte 2w
  OrnoL2Current: 0x0018, //4byte 2w
  OrnoL3Current: 0x001a, //4byte 2w
  OrnoTotalActivePower: 0x001c, //4byte 2w
  OrnoL1ActivePower: 0x001e, //4byte 2w
  OrnoL2ActivePower: 0x0020, //4byte 2w
  OrnoL3ActivePower: 0x0022, //4byte 2w
  OrnoTotalActiveEnergy: 0x0100,
  OrnoL1TotalActiveEnergy: 0x0102,
  OrnoL1ReactiveEnergy: 0x011a,
  OrnoL1ReactivePower: 0x002c,
  OrnoTotalReactivePower: 0x0024,
  OrnoTotalApparentPower: 0x002c,
  OrnoForwardActiveEnergy: 0x0108,
  OrnoReverseEnergy: 0x0110,
  OrnoTotalReactiveEnergy: 0x0118,
  OrnoForwardReactiveEnergy: 0x0120,
};

/**
 * @Member regAddress Module
 * @Immutable
 * @Object
 * @description Lumel AC Energy Meter measurand object
 * @note attribute: input registers
 */
const lumel_iData = {
  LumelL1Voltage: 0x0000,
  LumelL2Voltage: 0x0002,
  LumelL3Voltage: 0x0004,
  LumelL1Current: 0x0006,
  LumelL2Current: 0x0008,
  LumelL3Current: 0x0010,
  LumelL1Power: 0x000c,
  LumelL2Power: 0x000e,
  LumelL3Power: 0x0010,
  LumelTotalActivePower: 0x0034,
  LumelTotalActiveEnergy: 0x0158,
  SystemFrequency: 0x0046,
};

/**
 * @Member regAddress Module
 * @Immutable
 * @Object
 * @description Lumel AC EMD measurand object
 * @note attribute: input registers
 */
const lumel_iDataH = {
  DemandTIme: 0000,
  DemandPeriod: 0002,
  SystemVolts: 0006,
  SystemCurrent: 40009,
  SystemType: 40011,
  RelayPulseWidth: 40013,
  PasswordLock: 40015,
  NetworkParityStop: 40019,
  NetworkMode: 40021,
  PulseDivisor: 40023,
  Password: 40025,
  NetworkBaudRate: 40029,
  EnergyUnitsPrefix: 40031,
  SystemPower: 40037,
  Pulse1EnergyType: 40087,
  Pulse2EnegryType: 40089,
};

/**
 * @Member regAddress Module
 * @Immutable
 * @Object
 * @description GSO Battery measurand object
 * @note attribute: input registers
 */
const battery_iData = {
  BatteryTotalVoltage: 20000,
  BatteryTotalCurrent: 20001,
  BatterySystemSOC: 20002,
  BatteryRemainingCapacity: 20025,
  BatterySOH: 20026,
  BatteryFullSign: 20027,
  BatteryEmptyFlag: 20028,
};

/**
 * @Member regAddress Module
 * @Immutable
 * @Object
 * @description GSO Battery measurand object
 * @note attribute: input registers
 */
const batteryNCluster_iData = {
  NClusterTotalVoltage: 22000,
  NClusterTotalCurrent: 21001,
  NClusterSOC: 21002,
  NClusterCellMaxVoltage: 21003,
  NClusterCellMaxCurrent: 21004,
  NClusterCellAvgVoltage: 21005,
  NClusterCellMaxTemp: 21006,
  NClusterCellMinTemp: 21007,
  NClusterCellAvgTemp: 21008,
  NClusterBiggestMonomerNum: 21009,
  NClusterLowestMonomerNum: 21010,
  NClusterMaxTempSerialNum: 21011,
  NClusterMinTempSerialNum: 21012,
  NClusterMonomerPressureDiff: 21013,
  NClusterMonomerTempDiff: 21014,
  NClusterTotalCurrent: 21015,
  NClusterTotalCapacity: 21024,
  NClusterRemainingCapacity: 21025,
  NClusterSOH: 21026,
  NClusterBatteryFullSign: 21027,
  NClusterBatteryEmptyFlag: 21028,
  NClusterNumOfSingleCells: 21029,
  NClusterNumOfMonomerTemp: 21030,
};

module.exports = {
  acrel_iData: acrel_iData, //acrel input data
  acrelD_iData: acrelD_iData, //acrel dual input data
  orno_iData: orno_iData, //orno input data
  lumel_iData: lumel_iData, //lumel input data
  lumel_iDataH: lumel_iDataH,
  battery_iData: battery_iData,
  acrel_cumulated_iData: acrel_cumulated_iData,
  battery_basic_iData: battery_basic_iData,
  battery_accident_iData: battery_accident_iData,
  batteryNCluster_iData: batteryNCluster_iData,
};

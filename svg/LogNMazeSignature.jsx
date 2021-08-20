import { useState } from 'react';

const Icon = ({
	setAnimationEnd = () => {
		return;
	},
}) => {
	const [animationTime, setAnimationTime] = useState(7);

	return (
		<svg
			onAnimationEnd={() => setAnimationEnd(true)}
			className='lognmaze-signature'
			style={{
				'--animation-time': `${animationTime}s`,
			}}
			width='8232'
			height='2419'
			viewBox='0 0 8232 2419'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M16 845.004C48.4399 978.178 129.824 1222.55 319.146 1157.52C385.715 1134.65 434.403 1067.71 478.809 1017.44C576.369 906.993 656.818 794.199 723.625 662.776C808.484 495.84 851.908 300.942 805.372 116.091C797.144 83.4095 784.852 44.479 760.24 19.8678C736.598 -3.77441 709.429 88.2734 707.02 98.6346C684.317 196.256 690.159 303.672 690.415 403.058C691.065 656.052 702.224 907.829 692.118 1160.92C687.595 1274.2 682.906 1387.91 666.997 1500.26C656.828 1572.08 640.221 1643.9 637.194 1716.55C635.78 1750.49 631.104 1767.21 666.572 1774.03C755.532 1791.13 842.972 1796.28 933.102 1782.97C1023.34 1769.64 1111.61 1750.03 1200.48 1729.75C1295.92 1707.97 1403.77 1695.08 1486.6 1638.63C1545.78 1598.3 1589.95 1530.67 1613.9 1464.49C1671.24 1306.09 1707.92 1106.12 1649.24 943.356C1614.6 847.268 1546.67 768.438 1449.13 731.75C1346.89 693.292 1275.51 801.283 1238.8 880.768C1183.19 1001.19 1153.22 1137.63 1198.78 1266.09C1244.1 1393.86 1341.11 1529.72 1468.72 1584.56C1653.12 1663.81 1871.88 1544.86 2030.73 1453.85C2166.87 1375.85 2308.5 1271.09 2402 1143.47C2520.06 982.302 2452.7 641.55 2195.07 726.641C2046.02 775.873 1895.84 901.147 1947.28 1071.94C1996.67 1235.91 2224.62 1310.4 2367.94 1216.7C2467.96 1151.3 2504.42 1019.8 2583.37 934.415C2608.45 907.298 2596.21 1073.19 2595.72 1079.6C2576.17 1333.82 2484.76 1583.91 2342.39 1795.32C2136.45 2101.1 1786.32 2382.3 1404 2402.46C1315.35 2407.13 1146.82 2386.63 1151.09 2264.08C1154.9 2155.03 1300.29 2151.73 1379.73 2150.83C1521.64 2149.23 1661.03 2178.92 1803.37 2169.99C2070.87 2153.21 2316.56 2069.3 2523.77 1895.8C2700.99 1747.4 2730.16 1498.49 2808.18 1293.34C2891.43 1074.42 2970.5 863.19 2964.86 624.457C2962.44 521.961 2950.5 425.67 2914.62 328.974C2910.64 318.259 2832.32 115.767 2795.41 196.987C2748.6 299.967 2827.25 449.094 2865.23 541.006C2928.41 693.915 2999.23 845.567 3030.43 1009.35C3059.35 1161.16 3042.64 1319.79 2989.13 1464.49C2946.06 1580.98 2883.32 1688.13 2827.76 1798.72C2817.94 1818.29 2769.45 1894.94 2781.78 1928.58C2793.76 1961.25 2897.22 1869.16 2906.11 1860.88C3014.38 1760.07 3075.95 1606.1 3126.65 1470.88C3174.06 1344.47 3205.11 1214.17 3231.82 1082.16C3263.56 925.248 3314.8 767.913 3332.3 608.703C3350.7 441.206 3303.57 -64.3038 3320.8 103.318C3330.05 193.27 3351.13 280.985 3364.66 370.274C3399.8 602.209 3415.37 842.26 3420.43 1076.62C3425.52 1312.29 3398.47 1542.6 3367.64 1775.73C3361.21 1824.28 3350.61 1877.91 3350.61 1927.73C3350.61 1938.43 3353.52 1937.36 3360.82 1931.56C3434.49 1873.01 3477.16 1756.32 3515.8 1676.53C3625.24 1450.57 3710.83 1213.77 3780.63 972.734C3831.06 798.601 3854.1 625.465 3863.23 444.783C3866.27 384.602 3884.66 288.041 3857.27 229.345C3826.56 163.536 3918.71 360.971 3950.94 426.049C3990.65 506.24 4024.08 588.921 4079.94 659.795C4128.04 720.808 4144.62 704.674 4184.26 644.893C4240.07 560.721 4284.36 456.566 4289 354.521C4291.81 292.553 4255.27 286.587 4225.13 340.896C4173.72 433.544 4179.37 553.769 4186.39 655.538C4198.54 831.72 4201.11 978.991 4135.72 1146.45C4071.18 1311.72 3977.79 1451.98 3870.04 1591.8C3812.43 1666.56 3729.15 1761.28 3721.02 1860.88C3712.81 1961.5 3804.73 1857.7 3833.85 1828.95C4081.85 1584.15 4304.44 1293.96 4444.83 973.586C4510.54 823.618 4557.8 661.008 4568.3 497.152C4575.45 385.628 4562.77 274.553 4552.12 163.777C4549.41 135.617 4540.5 51.2665 4549.99 131.419C4563.88 248.665 4580.08 365.58 4595.12 482.676C4636.21 802.446 4638.25 1125.44 4618.54 1447.04C4611.73 1558.05 4598.95 1669.93 4598.95 1781.27C4598.95 1803.5 4614.91 1762.83 4616.84 1759.13C4673.13 1650.86 4704.95 1533.34 4727.54 1413.83C4781.34 1129.12 4794.66 838.433 4845.05 552.928C4859.8 469.348 4879.83 386.51 4889.75 302.151C4894.6 260.988 4885.31 385.093 4887.62 426.475C4904.82 733.615 4917.56 1052.8 4977.04 1355.07C4995.71 1449.99 5009.72 1568.11 5058.78 1653.96C5078.19 1687.92 5091.99 1726.22 5132.87 1734.01C5231.69 1752.83 5332.55 1733.66 5427.07 1702.5C5581.41 1651.61 5690.82 1565.98 5766.41 1420.64C5838.51 1282.01 5892.08 1106.61 5865.19 948.891C5855.09 889.701 5816.74 785.349 5743.84 777.733C5644.91 767.397 5622.07 904.757 5607.6 971.882C5592.61 1041.36 5556.61 1176.92 5642.93 1220.53C5738.24 1268.68 5880.69 1161.41 5927.35 1085.14C5937.95 1067.81 5939.73 1044.48 5954.6 1030.64C5956.84 1028.55 5956.78 1036.52 5956.73 1039.58C5956.09 1074.47 5950.58 1109.11 5947.78 1143.89C5936.74 1281.2 5912 1515.34 6102.34 1533.47C6156.97 1538.67 6237.42 1531.47 6266.26 1476.84C6336.16 1344.39 6365.12 1189.75 6386.32 1043.41C6391.41 1008.33 6426.1 1028.87 6451.47 1034.04C6511.23 1046.23 6571.66 1054.26 6631.57 1065.55C6652.47 1069.49 6694.5 1072.71 6707.78 1095.35C6733.79 1139.73 6665.34 1206.5 6641.78 1232.45C6572.83 1308.42 6497.83 1378.65 6428.9 1454.7C6383.43 1504.88 6326.93 1561.77 6299.47 1625.86C6294.29 1637.94 6285.97 1672.89 6308.83 1671.42C6405.98 1665.15 6509.21 1642.67 6603.04 1618.2C6664.8 1602.08 6736.85 1556.92 6798.47 1550.07C6892.27 1539.65 6993.4 1494.12 7082.88 1464.07C7257.54 1405.41 7470.91 1328.27 7570.81 1161.77C7624.45 1072.38 7633.82 937.282 7506.94 900.354C7482.48 893.232 7445.34 885.439 7430.73 906.314C7363.55 1002.28 7526.78 1213.28 7547.39 1240.54C7609.15 1322.21 7677.48 1401.25 7759 1463.22C8381.91 1936.75 7643.25 1309.55 8216.27 1596.06'
				stroke='black'
				strokeWidth='30'
				strokeLinecap='round'
			/>
			{/* <path
			d='M16 845.004C48.4399 978.178 129.824 1222.55 319.146 1157.52C385.715 1134.65 434.403 1067.71 478.809 1017.44C576.369 906.993 656.818 794.199 723.625 662.776C808.484 495.84 851.908 300.942 805.372 116.091C797.144 83.4095 784.852 44.479 760.24 19.8678C736.598 -3.77441 709.429 88.2734 707.02 98.6346C684.317 196.256 690.159 303.672 690.415 403.058C691.065 656.052 702.224 907.829 692.118 1160.92C687.595 1274.2 682.906 1387.91 666.997 1500.26C656.828 1572.08 640.221 1643.9 637.194 1716.55C635.78 1750.49 631.104 1767.21 666.572 1774.03C755.532 1791.13 842.972 1796.28 933.102 1782.97C1023.34 1769.64 1111.61 1750.03 1200.48 1729.75C1295.92 1707.97 1403.77 1695.08 1486.6 1638.63C1545.78 1598.3 1589.95 1530.67 1613.9 1464.49C1671.24 1306.09 1707.92 1106.12 1649.24 943.356C1614.6 847.268 1546.67 768.438 1449.13 731.75C1346.89 693.292 1275.51 801.283 1238.8 880.768C1183.19 1001.19 1153.22 1137.63 1198.78 1266.09C1244.1 1393.86 1341.11 1529.72 1468.72 1584.56C1653.12 1663.81 1871.88 1544.86 2030.73 1453.85C2166.87 1375.85 2308.5 1271.09 2402 1143.47C2520.06 982.302 2452.7 641.55 2195.07 726.641C2046.02 775.873 1895.84 901.147 1947.28 1071.94C1996.67 1235.91 2224.62 1310.4 2367.94 1216.7C2467.96 1151.3 2504.42 1019.8 2583.37 934.415C2608.45 907.298 2596.21 1073.19 2595.72 1079.6C2576.17 1333.82 2484.76 1583.91 2342.39 1795.32C2136.45 2101.1 1786.32 2382.3 1404 2402.46C1315.35 2407.13 1146.82 2386.63 1151.09 2264.08C1154.9 2155.03 1300.29 2151.73 1379.73 2150.83C1521.64 2149.23 1661.03 2178.92 1803.37 2169.99C2070.87 2153.21 2316.56 2069.3 2523.77 1895.8C2700.99 1747.4 2730.16 1498.49 2808.18 1293.34C2891.43 1074.42 2970.5 863.19 2964.86 624.457C2962.44 521.961 2950.5 425.67 2914.62 328.974C2910.64 318.259 2832.32 115.767 2795.41 196.987C2748.6 299.967 2827.25 449.094 2865.23 541.006C2928.41 693.915 2999.23 845.567 3030.43 1009.35C3059.35 1161.16 3042.64 1319.79 2989.13 1464.49C2946.06 1580.98 2883.32 1688.13 2827.76 1798.72C2817.94 1818.29 2769.45 1894.94 2781.78 1928.58C2793.76 1961.25 2897.22 1869.16 2906.11 1860.88C3014.38 1760.07 3075.95 1606.1 3126.65 1470.88C3174.06 1344.47 3205.11 1214.17 3231.82 1082.16C3263.56 925.248 3314.8 767.913 3332.3 608.703C3350.7 441.206 3303.57 -64.3038 3320.8 103.318C3330.05 193.27 3351.13 280.985 3364.66 370.274C3399.8 602.209 3415.37 842.26 3420.43 1076.62C3425.52 1312.29 3398.47 1542.6 3367.64 1775.73C3361.21 1824.28 3350.61 1877.91 3350.61 1927.73C3350.61 1938.43 3353.52 1937.36 3360.82 1931.56C3434.49 1873.01 3477.16 1756.32 3515.8 1676.53C3625.24 1450.57 3710.83 1213.77 3780.63 972.734C3831.06 798.601 3854.1 625.465 3863.23 444.783C3866.27 384.602 3884.66 288.041 3857.27 229.345C3826.56 163.536 3918.71 360.971 3950.94 426.049C3990.65 506.24 4024.08 588.921 4079.94 659.795C4128.04 720.808 4144.62 704.674 4184.26 644.893C4240.07 560.721 4284.36 456.566 4289 354.521C4291.81 292.553 4255.27 286.587 4225.13 340.896C4173.72 433.544 4179.37 553.769 4186.39 655.538C4198.54 831.72 4201.11 978.991 4135.72 1146.45C4071.18 1311.72 3977.79 1451.98 3870.04 1591.8C3812.43 1666.56 3729.15 1761.28 3721.02 1860.88C3712.81 1961.5 3804.73 1857.7 3833.85 1828.95C4081.85 1584.15 4304.44 1293.96 4444.83 973.586C4510.54 823.618 4557.8 661.008 4568.3 497.152C4575.45 385.628 4562.77 274.553 4552.12 163.777C4549.41 135.617 4540.5 51.2665 4549.99 131.419C4563.88 248.665 4580.08 365.58 4595.12 482.676C4636.21 802.446 4638.25 1125.44 4618.54 1447.04C4611.73 1558.05 4598.95 1669.93 4598.95 1781.27C4598.95 1803.5 4614.91 1762.83 4616.84 1759.13C4673.13 1650.86 4704.95 1533.34 4727.54 1413.83C4781.34 1129.12 4794.66 838.433 4845.05 552.928C4859.8 469.348 4879.83 386.51 4889.75 302.151C4894.6 260.988 4885.31 385.093 4887.62 426.475C4904.82 733.615 4917.56 1052.8 4977.04 1355.07C4995.71 1449.99 5009.72 1568.11 5058.78 1653.96C5078.19 1687.92 5091.99 1726.22 5132.87 1734.01C5231.69 1752.83 5332.55 1733.66 5427.07 1702.5C5581.41 1651.61 5690.82 1565.98 5766.41 1420.64C5838.51 1282.01 5892.08 1106.61 5865.19 948.891C5855.09 889.701 5816.74 785.349 5743.84 777.733C5644.91 767.397 5622.07 904.757 5607.6 971.882C5592.61 1041.36 5556.61 1176.92 5642.93 1220.53C5738.24 1268.68 5880.69 1161.41 5927.35 1085.14C5937.95 1067.81 5939.73 1044.48 5954.6 1030.64C5956.84 1028.55 5956.78 1036.52 5956.73 1039.58C5956.09 1074.47 5950.58 1109.11 5947.78 1143.89C5936.74 1281.2 5912 1515.34 6102.34 1533.47C6156.97 1538.67 6237.42 1531.47 6266.26 1476.84C6336.16 1344.39 6365.12 1189.75 6386.32 1043.41C6391.41 1008.33 6426.1 1028.87 6451.47 1034.04C6511.23 1046.23 6571.66 1054.26 6631.57 1065.55C6652.47 1069.49 6694.5 1072.71 6707.78 1095.35C6733.79 1139.73 6665.34 1206.5 6641.78 1232.45C6572.83 1308.42 6497.83 1378.65 6428.9 1454.7C6383.43 1504.88 6326.93 1561.77 6299.47 1625.86C6294.29 1637.94 6285.97 1672.89 6308.83 1671.42C6405.98 1665.15 6509.21 1642.67 6603.04 1618.2C6664.8 1602.08 6736.85 1556.92 6798.47 1550.07C6892.27 1539.65 6993.4 1494.12 7082.88 1464.07C7257.54 1405.41 7470.91 1328.27 7570.81 1161.77C7624.45 1072.38 7633.82 937.282 7506.94 900.354C7482.48 893.232 7445.34 885.439 7430.73 906.314C7363.55 1002.28 7526.78 1213.28 7547.39 1240.54C7609.15 1322.21 7677.48 1401.25 7759 1463.22C8381.91 1936.75 7643.25 1309.55 8216.27 1596.06'
			stroke='black'
			strokeOpacity='0.2'
			strokeWidth='30'
			strokeLinecap='round'
		/> */}
		</svg>
	);
};

export default Icon;

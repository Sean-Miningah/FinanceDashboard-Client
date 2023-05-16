import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween";
import { useGetProductsQuery, useGetKpisQuery } from "@/state/api"
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { CartesianGrid, Cell, LabelList, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";


type Props = {}
const pieData = [
  { name: "GroupA", value: 600 },
  { name: "GroupB", value: 400 }
]

const Row2 = (props: Props) => {
  const { palette } = useTheme();
  const pieColor = [palette.primary[800], palette.primary[300]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {
    return (
      operationalData 
        && operationalData.kpis[0].monthlyData.map
        (({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name: month.substring(0, 3),
          "Operational Expense": operationalExpenses, 
          "Non Operational Expenses": nonOperationalExpenses
        };
      })
    )
  }, [operationalData])

  const productExpenseData = useMemo(() => {
    return (
      productData 
        && productData.map
        (({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense
        };
      })
    )
  }, [productData])




  return (
    <>
      <DashboardBox 
        gridArea="d"
        >
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          sideText="+4%"
        />
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={operationalExpenses}
              margin={{
                top: 20,
                right: 0,
                left: -10,
                bottom: 55,
              }}
            >
              <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                style={{ fontSize: "10px" }}
                />
              <YAxis
                yAxisId="left" 
                orientation="left"
                tickLine={false}
                style={{ fontSize: "10px" }}
                axisLine={false}
              />
              <YAxis
                yAxisId="right" 
                orientation="right"
                tickLine={false}
                style={{ fontSize: "10px" }}
                axisLine={false}
              />
              <Tooltip />
              <Line
                yAxisId="left"
                type="monotone" 
                stroke={palette.tertiary[500]}
                dataKey="Non Operational Expenses"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="Operational Expense"
                stroke={palette.primary.main}
              />
            </LineChart>
          </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox 
        gridArea="e"
        >
        <BoxHeader title="Campaigns and Targets" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart 
            width={110} 
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColor[index]} />
              ))}
            </Pie>
            
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6"> Finance goals of the compaign that is desired</Typography>
          </Box>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography m="0.3rem 0" variant="h6">
              Losses are down 25%
            </Typography>
            <Typography variant="h5" mt="0.4rem"> Profit Margins</Typography>
            <Typography variant="h6">
              Margins are up by 30% from last Month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox 
        gridArea="f"
      >
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%"/>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: 0,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]}/>
            <XAxis 
              type="number" 
              dataKey="price" 
              name="price" 
              axisLine={false} 
              style={{ fontSize: "10px" }} 
              tickFormatter={(v) => `$ ${v}`}
              />
            <YAxis 
              type="number" 
              dataKey="expense" 
              name="price" 
              axisLine={false} 
              style={{ fontSize: "10px" }} 
              tickFormatter={(v) => `$ ${v}`} 
            />
            <ZAxis type="number" range={[30]} />
            <Tooltip formatter={(v) => `${v}`} />
            <Scatter name="Product Expense Ratio" data={productExpenseData} fill={palette.tertiary[500]}>
              <LabelList dataKey="x" />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row2
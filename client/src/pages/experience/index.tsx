import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  styled,
  useMediaQuery,
  useTheme
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MONTHS, MONTHS_SHORT } from "../../constants";
import { SyntheticEvent, useCallback, useState } from "react";

const InlineTypography = styled(Typography)({
  display: "inline"
});

interface IExperience {
  title: string,
  company: string,
  location: string,
  description: string,
  startDate: Date,
  endDate: Date | null,
}

const placerholderExperience = [
  {
    title: "Senior Software Engineer",
    company: "Zeal",
    location: "Remote",
    description: "Developed payroll API solutions for customer and internal usage using Node.js with Express and Typescript. Built frontend white label solutions to enable rapid customer success and easy use of Zeal’s payroll solutions using React and internal UI suites. Deployed to AWS using Jenkins and custom pipelines. Designed and developed new feature suites along with product teams to enable customer success and attract new clients.",
    startDate: new Date("2023-01-01T00:00:00"),
    endDate: null,
  },
  {
    title: "Senior Software Engineer",
    company: "Paylocity",
    location: "Remote",
    description: "Developed time and labor management solutions using C#, .NET (ASP, Framework, and Core), React, Ionic, and SQL Server. Deployed using TeamCity and Octopus. Modernized legacy solutions to utilize event-driven processing, RESTful microservice and CQRS patterns, optimize and scale performance, and improve UX. Performed penetration testing and served as appsec liaison. Triaged production issues using logs, system dashboards, and memdump analysis via VS and WinDbg. Worked with product and UX teams to design and lead development of multiple new features from the ground up. Mentored team members through one-on-one discussions, dedicated knowledge sharing sessions, and constructive code reviews.",
    startDate: new Date("2018-12-01T00:00:00"),
    endDate: new Date("2022-12-01T00:00:00"),
  },
  {
    title: "Chief Technology Officer",
    company: "Round2",
    location: "Remote",
    description: "Joined startup when they were using inefficient technologies and worked to rework their entire data flow pipeline. Led the migration from 100% WordPress to React, AWS Lambda Python functions, and AWS RDS PostgreSQL with a separate test environment. Regularly interfaced with and supported overseas developers to construct a functional MVP.",
    startDate: new Date("2020-06-01T00:00:00"),
    endDate: new Date("2021-06-01T00:00:00"),
  },
  {
    title: "Software Engineer",
    company: "Kabbage",
    location: "Atlanta, GA",
    description: "Worked to improve existing and develop new FinTech software solutions for the most valuable startup in Georgia. Stabilized existing Platform technologies and microservices written in C#, ASP.NET, and SQL Server. Furthered the development of internal management suites written in Python and Angular. Updated and built new full stack applications using AWS, Postgres, C#, .NET Core, Node, Angular, and React.",
    startDate: new Date("2017-05-01T00:00:00"),
    endDate: new Date("2018-12-01T00:00:00"),
  },
  {
    title: "Senior Software Engineer",
    company: "The Home Depot",
    location: "Atlanta, GA",
    description: "Started as Junior Java Developer Contractor then hired and ultimately promoted to Senior Software Engineer. Constructed, maintained and improved payment applications written in Javascript with Reactive Extensions (Rx), Redux, and AngularJS using Pivotal Cloud Foundry. Converted legacy Informix 4GL code to Java 8 RESTful Microservices with SQL database integration and Korn Shell wrapper scripts on Apache Tomcat 7. Utilized modern software development practices including Agile, Extreme Programming (XP), Test Driven Development (TDD), and continuous integration (CI).",
    startDate: new Date("2015-09-01T00:00:00"),
    endDate: new Date("2017-05-01T00:00:00"),
  },
  {
    title: "IT Specialist and General Technician",
    company: "Polymer Solutions",
    location: "Christiansburg, VA",
    description: "Implemented and maintained computer hardware and networks for use with laboratory equipment to aid in experimental testing of polymers and similar substances. Maintained production and testing websites, handling implementation of changes, security updates, and other alterations of site code and design. Performed all duties in compliance with FDA Regulations and ISO 17025 (Compliant with ISO 9001).",
    startDate: new Date("2013-05-01T00:00:00"),
    endDate: new Date("2015-08-01T00:00:00"),
  },
] as IExperience[];

const getFormattedDate = (date: Date | null, short = false) => {
  const months = short ? MONTHS_SHORT : MONTHS;
  return date ? `${months[date.getMonth()]} ${date.getFullYear()}` : "Present"
}

const buildSummary = (experience: IExperience, isSmall = false) => {
  const variant = isSmall ? "body2" : "body1";
  return (
    <Box display={"flex"} width={"100%"} justifyContent={"space-between"} flexDirection={{xs: "column", sm:"row"}}>
      <Box display={"flex"} flexDirection={{xs: "column", md: "row"}}>
        <Box>
          <InlineTypography fontWeight={"bold"}>{experience.title}</InlineTypography>
        </Box>
        <Box>
          <Typography display={{xs: 'none', md: 'inline'}} mx={1}>-</Typography>
          <InlineTypography variant={variant}>{experience.company}</InlineTypography>
          <InlineTypography variant={variant} ml={.5}>({experience.location})</InlineTypography>
        </Box>
      </Box>
      <Box>
        <InlineTypography variant={variant} fontWeight={"light"}>{getFormattedDate(experience.startDate, isSmall)}</InlineTypography>
        <InlineTypography variant={variant} fontWeight={"light"} mx={1}>-</InlineTypography>
        <InlineTypography variant={variant} fontWeight={"light"}>{getFormattedDate(experience.endDate, isSmall)}</InlineTypography>
      </Box>
    </Box>
  )
}

const getExperience = () => {
  const experience = [...placerholderExperience];
  return experience.sort((a, b) => b.startDate.getTime() - a.startDate.getTime())
}

export const Experience = () => {
  const [expanded, setExpanded] = useState(0);
  const theme = useTheme();
  const useShort = useMediaQuery(theme.breakpoints.down("md"));
  const experience = getExperience();

  const getSummary = useCallback((exp: IExperience) => (
    buildSummary(exp, useShort)
  ), [useShort]);

  const handleChange = (index: number) => (_: SyntheticEvent, isExpanded: boolean) =>
    setExpanded(isExpanded ? index : -1);

  return (
    <Box maxWidth={"lg"} mx={"auto"}>
      {experience.map((exp, index) => (
        <Accordion expanded={index === expanded} onChange={handleChange(index)} key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${exp.company}-content`}
            id={`${exp.company}-header`}
          >
            {getSummary(exp)}
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{exp.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

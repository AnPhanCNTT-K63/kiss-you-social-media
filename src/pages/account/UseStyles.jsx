import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
  container: {
    maxWidth: "900px",
    margin: "auto",
    marginTop: "20px",
    padding: "30px",
    backgroundColor: "#f0f2f5",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  avatar: {
    width: "120px",
    height: "120px",
    marginRight: "30px",
    border: "5px solid #eeeeee",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  section: {
    marginBottom: "30px",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderBottom: "1px solid #eeeeee",
    backgroundColor: "#f7f7f7",
  },
  sectionContent: {
    padding: "20px",
  },
  actionButton: {
    textTransform: "none",
    fontWeight: "bold",
    color: "#1976d2",
  },
  warningButton: {
    textTransform: "none",
    fontWeight: "bold",
    color: "#d32f2f",
  },
  card: {
    marginBottom: "25px",
    borderRadius: "10px",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    },
  },
  dangerButton: {
    textTransform: "none",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#d32f2f",
    "&:hover": {
      backgroundColor: "#b71c1c",
    },
  },
});

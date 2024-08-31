export const getResumeJdAnalysis = async (req, res) => {
  const { data } = req.body;

  console.log(data);

  res.json({ message: "Success" });
};

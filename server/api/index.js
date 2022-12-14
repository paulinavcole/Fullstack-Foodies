const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use('/addresses', require('./addresses'));
router.use("/restaurants", require("./restaurants"));
router.use("/dishes", require("./dishes"));
router.use("/cuisines", require("./cuisines"));
router.use("/categories", require("./categories"));
router.use("/orders", require("./orders"));
router.use("/stripe", require("./stripe"));
router.use("/reviews", require("./reviews"));
router.use('/savedRestaurants', require('./savedRestaurants'));
router.use("/location", require("./location"));
router.use('/saved-orders', require('./savedOrders'));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

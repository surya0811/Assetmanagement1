-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: assetmanagement
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products1`
--

DROP TABLE IF EXISTS `products1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productid` varchar(45) NOT NULL,
  `productName` varchar(45) NOT NULL,
  `productImage` varchar(500) NOT NULL,
  `productDescription` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `productid_UNIQUE` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products1`
--

LOCK TABLES `products1` WRITE;
/*!40000 ALTER TABLE `products1` DISABLE KEYS */;
INSERT INTO `products1` VALUES (1,'csel3cp001','cpu ','public/uploads/productImage_1707053682421.jpg','HP 280 G3 Micro-Tower (Core i5 8th Gen/ 8GB Ram/ 256GB SSD/ Windows 10 Pro/ Intel), Black'),(2,'csel3mo001','ases 15.6','public/uploads/productImage_1707130023657.jpeg','moniter with15.6 protonics '),(3,'csel3kb001','keyboard','public/uploads/productImage_1707213781948.jpeg','Logitech G413 Tkl Se Wired Mechanical Gaming Keyboard - Compact Backlit Keyboard with Tactile Mechanical Switches, Anti-Ghosting, Compatible for Windows, Macos - Black');
/*!40000 ALTER TABLE `products1` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-21 15:31:10

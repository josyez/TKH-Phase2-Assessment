import express from "express";
import  prisma  from "../db/index.js";

const router = express.Router();

// Create the routes here
router.get("/", async (request, response) => {
    try {
      const alluser = await prisma.user.findMany({
        where: {
            isActive: true
        },
      })
  
      if (alluser) {
        response.status(200).json({
          success: true,
          message: "all user fetch!",
          users: alluser
        })
      } else {
        response.status(400).json({
          success: false,
          message: "Something went wrong!"
        })
      }
    } catch (error) {
      console.log(error)
      response.status(400).json({
        success: false,
        message: "could not get any user data!"
      })
    }
  });

  router.post("/", async (request, response) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          
        },
      });
  
      if (newUser) {
        response.status(201).json({
          success: true,
          message: "User created",
        });

      } else {
        response.status(400).json({
          success: false,
          message: "User was not created",
        });
      }
    } catch (e) {
      console.log(e);
      response.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  })

  router.put("/:id", async (request, response) => {
    
    try {
      const updateUser = await prisma.user.updateMany({
        where: {
        //   userId: request.user.id,
          id: parseInt(request.params.id)
        },
        data: {
          firstName: request.body.firstName,
          
        },
      })
  
      if (updateUser) {
        response.status(200).json({
          success: true,
          message: "User information was updated",
        })

      } else {
        response.status(400).json({
          success: false,
          message: "User not updated. Something failed."
        })
      }
    } catch (err) {
      console.log(err)
      response.status(400).json({
        success: false,
        message: "Something went wrong"
      })
    }
  })

  router.delete("/:id", async (request, response) => {
    try {
      const deleteUser = await prisma.user.deleteMany({
        where: {
          id: parseInt(request.params.id),
        },
      })

      if (deleteUser) {
        response.status(200).json({
          success: true,
          message: "User was successfully deleted!",
        })

      } else {
        response.status(400), json({
          message: "Something went wrong, user could not be deleted!"
        })
      }
    } catch (error) {
      console.log(error)
      response.status(400).json({
        success: false,
        message: "Something went wrong!"
      })
    }
  })

  router.get("/admins", async (request, response) => {
    try {
      const allAdmin = await prisma.user.findMany({
        where: {
            isAdmin: true,
        }
      })
  
      if (allAdmin) {
        response.status(200).json({
          success: true,
          message: "all admin fetch!",
          users: allAdmin
        })

      } else {
        response.status(400).json({
          success: false,
          message: "Something went wrong!"
        })
      }

    } catch (error) {
      console.log(error)
      response.status(400).json({
        success: false,
        message: "could not get any admin data!"
      })
    }
  });

export default router;

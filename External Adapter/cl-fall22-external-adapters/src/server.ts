import process from "process";
import express, {Express, Request, Response} from "express";
import bodyParser from "body-parser";
import axios, {Axios, AxiosResponse} from "axios";
import { type } from "os";

type registerUserInput = {
    id: number | string;
    data: {
        email: string;
        password: string;
    }
}

type oneStringOutput = {
    jobRunId: string | number;
    statusCode: number;
    data: {
        response?: any;

    }
    error?: string;
}

// Login User
type loginUserInput = {
    id: number | string;
    data: {
        email: string;
        password: string;
        university: string;
    }
}

type logoutUserInput = {
    id: number | string;
    data: {
        email: string;
    }
}

type getPrivilegesInput = {
    id: number | string;
    data: {
        email: string;
        university: string;
    }
}

type setPrivilegesInput = {
    id: number | string;
    data: {
        email: string;
        university: string;
        rightNumber: string;
        rightValue: string;
    }
}


const PORT = process.env.PORT || 8080
const app: Express = express();

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("External Adapter says yeeeelllloooooww");
});

app.get("/showPrivileges", async (req: Request, res: Response) => {
    const eaInputData: getPrivilegesInput = req.body;
    console.log("getting hitted");
    
    const url = `http://138.68.102.221/showPriviliges.php`;

    let priviligesResponse: oneStringOutput = {
        data: {},
        jobRunId: eaInputData.id,
        statusCode: 0,
    };

    let seePrivilegeData = {
        email: eaInputData.data.email,
        university: eaInputData.data.university
    };

    try {
        const apiResponse: AxiosResponse = await axios.post(url, seePrivilegeData);
        priviligesResponse.data = {response: apiResponse.data};
        priviligesResponse.statusCode = apiResponse.status;
        console.log("RETURN response: ", priviligesResponse);
        res.json(priviligesResponse);
    } catch (error: any) {
        console.log("API Response error: ", error)
        priviligesResponse.error = error.message;
        priviligesResponse.statusCode = error.response;

        res.json(priviligesResponse);
    }
});

app.get("/setPriviliges", async (req: Request, res: Response) => {
    const eaInputData: setPrivilegesInput = req.body;
    console.log("getting hitted");
    
    const url = `http://138.68.102.221/setPriviliges.php`;

    let priviligesResponse: oneStringOutput = {
        data: {},
        jobRunId: eaInputData.id,
        statusCode: 0,
    };

    let seePrivilegeData = {
        email: eaInputData.data.email,
        university: eaInputData.data.university,
        rightNumber: eaInputData.data.rightNumber,
        rightValue: eaInputData.data.rightValue
    };

    try {
        const apiResponse: AxiosResponse = await axios.post(url, seePrivilegeData);
        priviligesResponse.data = {response: apiResponse.data};
        priviligesResponse.statusCode = apiResponse.status;
        console.log("RETURN response: ", priviligesResponse);
        res.json(priviligesResponse);
    } catch (error: any) {
        console.log("API Response error: ", error)
        priviligesResponse.error = error.message;
        priviligesResponse.statusCode = error.response;

        res.json(priviligesResponse);
    }
});

app.post("/registerUser", async (req: Request, res: Response)=> {
    const eaInputData: registerUserInput = req.body;
    console.log(" Request data received : ", eaInputData);

    //Build the api request
    //body oder ? wie? Axios request mit body möglich??
    const url = `http://138.68.102.221/createUser.php`;

    let eaResponse: oneStringOutput = {
        data: {},
        jobRunId: eaInputData.id,
        statusCode: 0,
    };

    let registerData = {
        email: eaInputData.data.email,
        password: eaInputData.data.password
    };

    try {
        const apiResponse: AxiosResponse = await axios.post(url, registerData);
        console.log("RAW API response: ", apiResponse);
        eaResponse.data = {response: apiResponse.data};
        eaResponse.statusCode = apiResponse.status;
        console.log("RETURN response: ", eaResponse);
        res.json(eaResponse);
    } catch (error: any) {
        console.log("API Response error: ", error)
        eaResponse.error = error.message;
        eaResponse.statusCode = error.response;

        res.json(eaResponse);
    }

});

app.post("/deleteUser", async (req: Request, res: Response)=> {
    const eaInputData: logoutUserInput = req.body;
    console.log(" Request data received : ", eaInputData);

    //Build the api request
    //body oder ? wie? Axios request mit body möglich??
    const url = `http://138.68.102.221/deleteUser.php`;

    let eaResponse: oneStringOutput = {
        data: {},
        jobRunId: eaInputData.id,
        statusCode: 0,
    };

    let deleteData = {
        email: eaInputData.data.email
    };

    try {
        const apiResponse: AxiosResponse = await axios.post(url, deleteData);
        console.log("RAW API response: ", apiResponse);
        eaResponse.data = {response: apiResponse.data};
        eaResponse.statusCode = apiResponse.status;
        console.log("RETURN response: ", eaResponse);
        res.json(eaResponse);
    } catch (error: any) {
        console.log("API Response error: ", error)
        eaResponse.error = error.message;
        eaResponse.statusCode = error.response;

        res.json(eaResponse);
    }

});

app.post("/loginUser", async (req: Request, res: Response) => {
    const loginInputData: loginUserInput = req.body;
    console.log(" Request data received HELLO : ", loginInputData.data.university);

    const url = `http://138.68.102.221/loginUser.php`;

    let loginResponse: oneStringOutput = {
        data: {},
        jobRunId: loginInputData.id,
        statusCode: 0,
    };

    let loginData = {
        email: loginInputData.data.email,
        password: loginInputData.data.password,
        university: loginInputData.data.university,
    };

    try {
        const apiResponse: AxiosResponse = await axios.post(url, loginData);
        loginResponse.data = {response: apiResponse.data};
        loginResponse.statusCode = apiResponse.status;
        console.log("RETURN response: ", loginResponse);
        res.json(loginResponse);
    } catch (error: any) {
        console.log("API Response error: ", error)
        loginResponse.error = error.message;
        loginResponse.statusCode = error.response;

        res.json(loginResponse);
    }

})

app.post("/logoutUser", async (req: Request, res: Response) => {
    const logoutInputData: logoutUserInput = req.body;
    console.log(" Request data received HELLO : ", logoutInputData.data);

    const url = `http://138.68.102.221/logoutUser.php`;

    let logoutResponse: oneStringOutput = {
        data: {},
        jobRunId: logoutInputData.id,
        statusCode: 0,
    };

    let logoutData = {
        email: logoutInputData.data.email,
    };

    try {
        const apiResponse: AxiosResponse = await axios.post(url, logoutData);
        logoutResponse.data = {response: apiResponse.data};
        logoutResponse.statusCode = apiResponse.status;
        console.log("RETURN response: ", logoutResponse);
        res.json(logoutResponse);
    } catch (error: any) {
        console.log("API Response error: ", error)
        logoutResponse.error = error.message;
        logoutResponse.statusCode = error.response;

        res.json(logoutResponse);
    }

});

app.get("/test", (req: Request, res: Response) => {
    res.json({"hallo": "Hallo"})
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});


// curl command:
// curl.exe -X POST -H "Content-Type:application/json" "http://localhost:8080/" --data-binary '{ \"id\": 10, \"data\": { \"email\": \"lets go\", \"password\": \"trivia\" }}'
    
// start server on ubuntu with pm2: pm2 start yarn --interpreter bash --name api -- start

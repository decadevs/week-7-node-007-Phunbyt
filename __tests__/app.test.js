const request = require('supertest');
const app = require('../lib/app.js');
describe("GET /fetchRecords", () => {
    it("should return a json file history of calculations", (done) => {
        request(app)
            .get('/fetchRecords')
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done)
    })
})


describe("POST /calculate", () => {
    it("should return a new calculation for square", async() => {
        const data = {
            "shape": "square",
            "dimension": 2
        }
        const res = await request(app)
            .post("/calculate")
            .send(data)
            .set("Accept", "application/json");
        expect(res.body.area).toEqual(4)
        expect(res.type).toBe("application/json")
        expect(res.status).toEqual(201);
    });
    it("should return a new calculation for circle", async() => {
        const data = {
            "shape": "circle",
            "dimension": 8
        }
        const res = await request(app)
            .post("/calculate")
            .send(data)
            .set("Accept", "application/json");
        expect(res.body.area).toEqual(201.06)
        expect(res.type).toBe("application/json")
        expect(res.status).toEqual(201);
    });
});


describe("Error for POST /calculate", () => {
    it("should return error for invalid dimension", async() => {
        const data = {
            shape: "rectangle",
            dimension: 2,
        };
        const res = await request(app)
            .post("/calculate")
            .send(data)
            .set("Accept", "application/json");
        expect(res.body).toEqual("guy gimme valid dimension na");
        expect(res.type).toBe("application/json");
        expect(res.status).toEqual(400);
    });
    it("should return error for invalid shape areas", async() => {
        const data = {
            shape: "triangle",
            dimension: {
                "a": 105,
                "b": 99,
                "c": 6
            }
        };
        const res = await request(app)
            .post("/calculate")
            .send(data)
            .set("Accept", "application/json");
        expect(res.body).toBe("Impossible Shape");
        expect(res.type).toBe("application/json");
        expect(res.status).toEqual(400);
    });

    it("should return error for invalid shape input", async() => {
        const data = {
            shape: "sphere",
            dimension: 2,
        };
        const res = await request(app)
            .post("/calculate")
            .send(data)
            .set("Accept", "application/json");
        expect(res.body).toEqual("guy gimmme valid shape na");
        expect(res.type).toBe("application/json");
        expect(res.status).toEqual(404);
    });
});
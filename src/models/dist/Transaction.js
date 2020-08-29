"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var Transaction = /** @class */ (function () {
    function Transaction() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], Transaction.prototype, "id");
    __decorate([
        typeorm_1.Column()
    ], Transaction.prototype, "title");
    __decorate([
        typeorm_1.Column()
    ], Transaction.prototype, "type");
    __decorate([
        typeorm_1.Column()
    ], Transaction.prototype, "value");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Transaction.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Transaction.prototype, "updated_at");
    Transaction = __decorate([
        typeorm_1.Entity('transactions')
    ], Transaction);
    return Transaction;
}());
exports["default"] = Transaction;

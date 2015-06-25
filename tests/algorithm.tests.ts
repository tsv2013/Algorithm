﻿/// <reference path="../scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../widget/algorithm.ts" />
/// <reference path="../scripts/typings/qunit/qunit.d.ts" />

module Algorithm.Tests {

    QUnit.module("Algorithm algorithm view model tests");

    var algorithm1 = {
        items: [
            { id: 9, text: "9" },
            { id: 6, text: "6" },
            { id: 3, text: "3" },
            { id: 7, text: "7" },
            { id: 2, text: "2" },
            { id: 1, text: "1" },
            { id: 4, text: "4" },
            { id: 5, text: "5" },
            { id: 8, text: "8" },
        ],
        transitions: [
            { iid: 1, exit1: 2, exit2: null },
            { iid: 2, exit1: 3, exit2: null },
            { iid: 2, exit1: 5, exit2: null },
            { iid: 3, exit1: 4, exit2: null },
            { iid: 4, exit1: 6, exit2: null },
            { iid: 5, exit1: 6, exit2: null },
            { iid: 6, exit1: 7, exit2: 8 },
            { iid: 7, exit1: 9, exit2: null },
            { iid: 8, exit1: 9, exit2: null },
        ]
    };

    var algorithm2 = {
        items: [
            { id: 3, text: "3" },
            { id: 2, text: "2" },
            { id: 1, text: "1" },
            { id: 4, text: "4" },
        ],
        transitions: [
            { iid: 1, exit1: 2, exit2: null },
            { iid: 2, exit1: 3, exit2: null },
            { iid: 3, exit1: 4, exit2: 2 },
        ]
    };

    test("blocks order", function() {
        var algorithmViewModel = new AlgorithmViewModel(algorithm1);

        equal(algorithmViewModel.blocks()[0].id(), 1);
        equal(algorithmViewModel.blocks()[1].id(), 2);
        equal(algorithmViewModel.blocks()[2].id(), 3);
        equal(algorithmViewModel.blocks()[3].id(), 4);
        equal(algorithmViewModel.blocks()[4].id(), 5);
        equal(algorithmViewModel.blocks()[5].id(), 6);
        equal(algorithmViewModel.blocks()[6].id(), 7);
        equal(algorithmViewModel.blocks()[7].id(), 8);
        equal(algorithmViewModel.blocks()[8].id(), 9);
    });

    test("prepare transitions", function() {
        var algorithmViewModel = new AlgorithmViewModel(algorithm1);

        equal(algorithmViewModel.transitions().length, 10);
        equal(algorithmViewModel.transitions()[0].type(), "direct");
        equal(algorithmViewModel.transitions()[0].startBlock().id(), 1);
        equal(algorithmViewModel.transitions()[0].endBlock().id(), 2);
        equal(algorithmViewModel.transitions()[1].type(), "direct");
        equal(algorithmViewModel.transitions()[1].startBlock().id(), 2);
        equal(algorithmViewModel.transitions()[1].endBlock().id(), 3);
        equal(algorithmViewModel.transitions()[2].type(), "far");
        equal(algorithmViewModel.transitions()[2].level(), 2);
        equal(algorithmViewModel.transitions()[2].startBlock().id(), 2);
        equal(algorithmViewModel.transitions()[2].endBlock().id(), 5);
        equal(algorithmViewModel.transitions()[3].type(), "direct");
        equal(algorithmViewModel.transitions()[3].startBlock().id(), 3);
        equal(algorithmViewModel.transitions()[3].endBlock().id(), 4);
        equal(algorithmViewModel.transitions()[4].type(), "far");
        equal(algorithmViewModel.transitions()[4].level(), 1);
        equal(algorithmViewModel.transitions()[4].startBlock().id(), 4);
        equal(algorithmViewModel.transitions()[4].endBlock().id(), 6);
        equal(algorithmViewModel.transitions()[5].type(), "direct");
        equal(algorithmViewModel.transitions()[5].startBlock().id(), 5);
        equal(algorithmViewModel.transitions()[5].endBlock().id(), 6);
        equal(algorithmViewModel.transitions()[6].type(), "direct");
        equal(algorithmViewModel.transitions()[6].startBlock().id(), 6);
        equal(algorithmViewModel.transitions()[6].endBlock().id(), 7);
        equal(algorithmViewModel.transitions()[7].type(), "far");
        equal(algorithmViewModel.transitions()[7].direction(), "down");
        equal(algorithmViewModel.transitions()[7].level(), 1);
        equal(algorithmViewModel.transitions()[7].startBlock().id(), 6);
        equal(algorithmViewModel.transitions()[7].endBlock().id(), 8);
    });

    test("prepare transitions back", function() {
        var algorithmViewModel = new AlgorithmViewModel(algorithm2);

        equal(algorithmViewModel.transitions().length, 4);
        equal(algorithmViewModel.transitions()[0].type(), "direct");
        equal(algorithmViewModel.transitions()[0].startBlock().id(), 1);
        equal(algorithmViewModel.transitions()[0].endBlock().id(), 2);
        equal(algorithmViewModel.transitions()[1].type(), "direct");
        equal(algorithmViewModel.transitions()[1].startBlock().id(), 2);
        equal(algorithmViewModel.transitions()[1].endBlock().id(), 3);
        equal(algorithmViewModel.transitions()[2].type(), "direct");
        equal(algorithmViewModel.transitions()[2].startBlock().id(), 3);
        equal(algorithmViewModel.transitions()[2].endBlock().id(), 4);
        equal(algorithmViewModel.transitions()[3].type(), "far");
        equal(algorithmViewModel.transitions()[3].direction(), "up");
        equal(algorithmViewModel.transitions()[3].level(), 1);
        equal(algorithmViewModel.transitions()[3].startBlock().id(), 3);
        equal(algorithmViewModel.transitions()[3].endBlock().id(), 2);
    });

    test("add block", function () {
        var algorithmViewModel = new AlgorithmViewModel(algorithm2);

        equal(algorithmViewModel.blocks().length, 4, "source configuration");
        equal(algorithmViewModel.blocks()[0].id(), 1);
        equal(algorithmViewModel.blocks()[1].id(), 2);
        equal(algorithmViewModel.blocks()[2].id(), 3);

        algorithmViewModel.addBlock(algorithmViewModel.blocks()[1]);
        equal(algorithmViewModel.blocks().length, 5, "block was added after");
        equal(algorithmViewModel.blocks()[0].id(), 1);
        equal(algorithmViewModel.blocks()[1].id(), 2);
        equal(algorithmViewModel.blocks()[2].id(), 5);
        equal(algorithmViewModel.blocks()[3].id(), 3);
        equal(algorithmViewModel.transitions().length, 5, "transitions");
        equal(algorithmViewModel.transitions()[0].type(), "direct");
        equal(algorithmViewModel.transitions()[0].startBlock().id(), 1);
        equal(algorithmViewModel.transitions()[0].endBlock().id(), 2);
        equal(algorithmViewModel.transitions()[1].type(), "direct");
        equal(algorithmViewModel.transitions()[1].startBlock().id(), 5);
        equal(algorithmViewModel.transitions()[1].endBlock().id(), 3);
        equal(algorithmViewModel.transitions()[2].type(), "direct");
        equal(algorithmViewModel.transitions()[2].startBlock().id(), 3);
        equal(algorithmViewModel.transitions()[2].endBlock().id(), 4);
        equal(algorithmViewModel.transitions()[3].type(), "far");
        equal(algorithmViewModel.transitions()[3].direction(), "up");
        equal(algorithmViewModel.transitions()[3].level(), 1);
        equal(algorithmViewModel.transitions()[3].startBlock().id(), 3);
        equal(algorithmViewModel.transitions()[3].endBlock().id(), 2);
        equal(algorithmViewModel.transitions()[4].type(), "direct");
        equal(algorithmViewModel.transitions()[4].startBlock().id(), 2);
        equal(algorithmViewModel.transitions()[4].endBlock().id(), 5);

        algorithmViewModel.addBlock(algorithmViewModel.blocks()[1], true);
        equal(algorithmViewModel.blocks().length, 6, "block was added before");
        equal(algorithmViewModel.blocks()[0].id(), 1);
        equal(algorithmViewModel.blocks()[1].id(), 7); // not 6 because transitions are using the same MaxID
        equal(algorithmViewModel.blocks()[2].id(), 2);
        equal(algorithmViewModel.blocks()[3].id(), 5);
    });

    test("remove block", function() {
        var changes = [];
        algorithm2["blockMappings"] = {
            change: (kind: string, object: ItemHolder) => {
                changes.push({ element: "block", kind: kind, object: object });
            }
        };
        algorithm2["transitionMappings"] = {
            change: (kind: string, object: ItemHolder) => {
                changes.push({ element: "transition", kind: kind, object: object });
            }
        };
        var algorithmViewModel = new AlgorithmViewModel(algorithm2);

        equal(algorithmViewModel.blocks().length, 4, "source configuration");
        equal(algorithmViewModel.blocks()[0].id(), 1);
        equal(algorithmViewModel.blocks()[1].id(), 2);
        equal(algorithmViewModel.blocks()[2].id(), 3);

        algorithmViewModel.removeBlock(algorithmViewModel.blocks()[1]);
        equal(algorithmViewModel.blocks().length, 3, "block was removed");
        equal(algorithmViewModel.blocks()[0].id(), 1);
        equal(algorithmViewModel.blocks()[1].id(), 3);
        equal(algorithmViewModel.blocks()[2].id(), 4);
        equal(algorithmViewModel.transitions().length, 2, "transitions");
        equal(algorithmViewModel.transitions()[0].type(), "direct");
        equal(algorithmViewModel.transitions()[0].startBlock().id(), 1);
        equal(algorithmViewModel.transitions()[0].endBlock().id(), 3);
        equal(algorithmViewModel.transitions()[1].type(), "direct");
        equal(algorithmViewModel.transitions()[1].startBlock().id(), 3);
        equal(algorithmViewModel.transitions()[1].endBlock().id(), 4);

        equal(changes.length, 5);
        equal(changes[0].element, "transition");
        equal(changes[0].kind, "edit");
        //equal(changes[0].object.id(), "2");
        equal(changes[1].element, "transition");
        equal(changes[1].kind, "edit");
        //equal(changes[1].object.id(), "2");
        equal(changes[2].element, "transition");
        equal(changes[2].kind, "deleted");
        //equal(changes[2].object.id(), "2");
        equal(changes[3].element, "block");
        equal(changes[3].kind, "deleted");
        equal(changes[3].object.id(), "2");
        equal(changes[4].element, "transition");
        equal(changes[4].kind, "deleted");
        //equal(changes[4].object.id(), "2");
    });

    test("get model", function() {
        var algorithmViewModel = new AlgorithmViewModel(algorithm2);

        deepEqual(algorithmViewModel.model, {
            "items": [
                {
                    "id": 1,
                    "text": "1"
                },
                {
                    "id": 2,
                    "text": "2"
                },
                {
                    "id": 3,
                    "text": "3"
                },
                {
                    "id": 4,
                    "text": "4"
                }
            ],
            "transitions": [
                {
                    "exit1": 2,
                    "exit2": undefined,
                    "iid": 1
                },
                {
                    "exit1": 3,
                    "exit2": undefined,
                    "iid": 2
                },
                {
                    "exit1": 4,
                    "exit2": undefined,
                    "iid": 3
                },
                {
                    "exit1": undefined,
                    "exit2": 2,
                    "iid": 3
                }
            ]
        });
    });

    test("multiple far transitions", function() {
        var algorithmViewModel = new AlgorithmViewModel({
            items: [
                { id: 3, text: "3" },
                { id: 2, text: "2" },
                { id: 1, text: "1" },
                { id: 4, text: "4" },
            ],
            transitions: [
                { iid: 1, exit1: 2, exit2: null },
                { iid: 1, exit1: 3, exit2: null },
                { iid: 1, exit1: 4, exit2: null },
                { iid: 2, exit1: 3, exit2: null },
                { iid: 2, exit1: 4, exit2: null },
            ]
        });

        equal(algorithmViewModel.blocks()[0].id(), 1);
        equal(algorithmViewModel.blocks()[1].id(), 3);
        equal(algorithmViewModel.blocks()[2].id(), 2);
        equal(algorithmViewModel.blocks()[3].id(), 4);
        equal(algorithmViewModel.transitions().length, 5, "transitions");
        equal(algorithmViewModel.transitions()[0].type(), "far");
        equal(algorithmViewModel.transitions()[0].level(), 2);
        equal(algorithmViewModel.transitions()[1].type(), "direct");
        equal(algorithmViewModel.transitions()[1].level(), 1);
        equal(algorithmViewModel.transitions()[2].type(), "far");
        equal(algorithmViewModel.transitions()[2].level(), 3);
        equal(algorithmViewModel.transitions()[3].type(), "far");
        equal(algorithmViewModel.transitions()[3].level(), 1);
        equal(algorithmViewModel.transitions()[4].type(), "direct");
        equal(algorithmViewModel.transitions()[4].level(), 1);
    });

} 
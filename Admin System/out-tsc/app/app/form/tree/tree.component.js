var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { TREE_ACTIONS, KEYS } from 'angular-tree-component';
var actionMapping = {
    mouse: {
        contextMenu: function (tree, node, $event) {
            $event.preventDefault();
            alert("context menu for " + node.data.name);
        },
        dblClick: function (tree, node, $event) {
            if (node.hasChildren) {
                TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
            }
        },
        click: function (tree, node, $event) {
            $event.shiftKey
                ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
                : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
        }
    },
    keys: (_a = {},
        _a[KEYS.ENTER] = function (tree, node, $event) { return alert("This is " + node.data.name); },
        _a)
};
var FormTreeComponent = (function () {
    function FormTreeComponent() {
        this.nodes2 = [{ name: 'root' }, { name: 'root2' }];
        this.asyncChildren = [
            {
                name: 'child2.1',
                subTitle: 'new and improved'
            }, {
                name: 'child2.2',
                subTitle: 'new and improved2'
            }
        ];
        this.customTemplateStringOptions = {
            // displayField: 'subTitle',
            isExpandedField: 'expanded',
            idField: 'uuid',
            getChildren: this.getChildren.bind(this),
            actionMapping: actionMapping,
            nodeHeight: 23,
            allowDrag: true,
            useVirtualScroll: true
        };
    }
    FormTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.nodes = [
                {
                    expanded: true,
                    name: 'root expanded',
                    subTitle: 'the root',
                    children: [
                        {
                            name: 'child1',
                            subTitle: 'a good child',
                            hasChildren: false
                        }, {
                            name: 'child2',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
                {
                    name: 'root2',
                    subTitle: 'the second root',
                    children: [
                        {
                            name: 'child2.1',
                            subTitle: 'new and improved',
                            hasChildren: false
                        }, {
                            name: 'child2.2',
                            subTitle: 'new and improved2',
                            children: [
                                {
                                    uuid: 1001,
                                    name: 'subsub',
                                    subTitle: 'subsub',
                                    hasChildren: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'asyncroot',
                    hasChildren: true
                }
            ];
            var _loop_1 = function (i) {
                _this.nodes.push({
                    name: "rootDynamic" + i,
                    subTitle: "root created dynamically " + i,
                    children: new Array(4).fill(null).map(function (item, n) { return ({
                        name: "childDynamic" + i + "." + n,
                        subTitle: "child created dynamically " + i,
                        hasChildren: false
                    }); })
                });
            };
            for (var i = 0; i < 5; i++) {
                _loop_1(i);
            }
        }, 1);
    };
    FormTreeComponent.prototype.getChildren = function (node) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(_this.asyncChildren.map(function (c) {
                return Object.assign({}, c, {
                    hasChildren: node.level < 5
                });
            })); }, 1000);
        });
    };
    FormTreeComponent.prototype.addNode = function (tree) {
        this.nodes[0].children.push({
            name: 'a new child'
        });
        tree.treeModel.update();
    };
    FormTreeComponent.prototype.childrenCount = function (node) {
        return node && node.children ? "(" + node.children.length + ")" : '';
    };
    FormTreeComponent.prototype.filterNodes = function (text, tree) {
        tree.treeModel.filterNodes(text);
    };
    FormTreeComponent.prototype.activateSubSub = function (tree) {
        // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
        tree.treeModel.getNodeById(1001)
            .setActiveAndVisible();
    };
    FormTreeComponent.prototype.onEvent = function (event) {
        console.log(event);
    };
    FormTreeComponent.prototype.go = function ($event) {
        $event.stopPropagation();
        alert('this method is on the app component');
    };
    FormTreeComponent.prototype.activeNodes = function (treeModel) {
        console.log(treeModel.activeNodes);
    };
    FormTreeComponent = __decorate([
        Component({
            selector: 'app-tree',
            templateUrl: './tree.component.html',
            styleUrls: ['./tree.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], FormTreeComponent);
    return FormTreeComponent;
}());
export { FormTreeComponent };
var _a;
//# sourceMappingURL=tree.component.js.map
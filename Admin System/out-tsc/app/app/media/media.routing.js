import { GridComponent } from './grid/grid.component';
import { TileComponent } from './tile/tile.component';
import { ListComponent } from './list/list.component';
export var MediaRoutes = [
    {
        path: '',
        children: [{
                path: 'grid',
                component: GridComponent,
                data: {
                    heading: 'Media Grid'
                }
            }, {
                path: 'tile',
                component: TileComponent,
                data: {
                    heading: 'Media Tiles'
                }
            }, {
                path: 'list',
                component: ListComponent,
                data: {
                    heading: 'Media Lists'
                }
            }]
    }
];
//# sourceMappingURL=media.routing.js.map
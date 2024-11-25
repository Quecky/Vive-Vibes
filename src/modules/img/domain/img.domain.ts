import { Base } from '@/common/domain/base.domain';
import { Tour } from '@/modules/tour/domain/tour.domain';

export class ImagenAttached extends Base {
    name: string;
    url: string;      
    tours?: Tour[];
}

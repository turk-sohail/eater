import { Module, Global } from '@nestjs/common';
import { Bcrypt } from './Bcrypt';

@Global()
@Module({
    exports: [Bcrypt],
    providers: [Bcrypt]
})
export class CommonModule { }

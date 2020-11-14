import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { UserDto } from "./user.dto";

@ApiModel({
  description: "Data Transfer Object representing a token with a user",
  name: "TokenUserResponseDto",
  
})
export class TokenUserResponseDto {
  @ApiModelProperty({
    description: "the token",
    required: true,
  })
  token: string;

  @ApiModelProperty({
    description: "the user",
    required: true,
  })
  user: UserDto;
}

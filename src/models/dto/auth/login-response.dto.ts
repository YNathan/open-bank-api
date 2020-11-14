import { ApiModel, ApiModelProperty } from "swagger-express-ts";
import { UserDto } from "../user/user.dto";

@ApiModel({
  name: "LoginResponseDto",
  description: "Login Response DTO",
})
export class LoginResponseDto {
  @ApiModelProperty({
    description: "JWT token",
    required: true,
  })
  public token: string;

  @ApiModelProperty({
    description: "The user returning from the response",
    required: true,
    model: "Userdto",
  })
  user: UserDto;
}

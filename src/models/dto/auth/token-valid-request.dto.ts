import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "request body for checking if token is valid",
  name: "TokenValidRequestDto",
})
export class TokenValidRequestDto {
  @ApiModelProperty({
    description: "JWT token",
    required: true,
  })
  token: string;
}

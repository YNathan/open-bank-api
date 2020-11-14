import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  description: "True/False depending on the token",
  name: "TokenValidResponseDto",
})
export class TokenValidResponseDto {
  @ApiModelProperty({
    description: "is the token valid",
    required: true,
  })
  isvalid: boolean;
}
